import {RouterContext, Status, YouTube, YouTube_live} from "../deps.ts";
import {mutateDQL, mutateGraphQL, queryGraphQL} from "../helpers.ts";
import {addLiveBroadcast, Configs} from "../graphql/index.ts";
import {upsertConfig} from "../dql/index.ts";

const sleep = async function (duration : number) {
    await new Promise((r) => setTimeout(r, duration));
};

const getLives = (obj : any, requestType : any, params : object) => obj[`${requestType}`](params).then(function (response : any) {
    if (response.error) 
        throw new Error(`${
            response.error.message
        }`);
    if (response.items.length < 1 && response.kind !== "youtube#liveChatMessageListResponse") 
        throw new Error(`No Lives found`);
    return response;
});

export default {
    watchLives: async (ctx : RouterContext) => {
        let _data;

        if (!ctx.request.hasBody) {
            ctx.throw(Status.BadRequest, "Bad Request");
        }

        const body = ctx.request.body();

        if (body.type !== "json") {
            ctx.throw(Status.BadRequest, "Bad Request");
        } else {
            _data = await body.value;
        }

        let query = await queryGraphQL(false, Configs).then((res) => res.data.getConfigs);

        if (_data ?. pull_LiveBroadcast !== query.pull_LiveBroadcast) {
            await mutateDQL(upsertConfig);
        }

        (async () => {

            let obj = new YouTube_live(query.API_Token, query.access_token);
            let _pull = true;

            while (_pull) {
                try {
                    const addInput = await getLives(obj, "liveBroadcasts_list", {
                        part: "snippet",
                        broadcastStatus: "active",
                        broadcastType: "all"
                    }).then((e : any) => e.items[0]).then(async function (response : any) {
                        const {
                            snippet: {
                                title,
                                publishedAt,
                                liveChatId
                            },
                            id
                        } = response;

                        const liveChat = await getLives(obj, "liveChat_list", {
                            part: "snippet",
                            liveChatId
                        });

                        const {nextPageToken, etag} = liveChat;

                        return {
                            patch: [
                                {
                                    id,
                                    title,
                                    publishedAt,
                                    liveChat: {
                                        id: liveChatId,
                                        etag,
                                        nextPageToken
                                    },
                                    liveChatId
                                }
                            ]
                        };
                    });

                    await mutateGraphQL(false, addLiveBroadcast, addInput);

                } catch (e) {
                    console.log(e)
                    console.log("Message => ", e.message);
                    console.log("Action  => ", "Break the loop. No data to be pulling.");
                    break;
                }
                await sleep(60000);

                _pull = await queryGraphQL(false, Configs).then((res) => res.data.getConfigs.pull_LiveBroadcast);

                if (_pull !== true) 
                    break;
            }
        })();

        ctx.response.status = 200;
        ctx.response.body = "OK";

    },
    chatWatch: async (ctx : RouterContext) => {
        let _data;

        if (!ctx.request.hasBody) {
            ctx.throw(Status.BadRequest, "Bad Request");
        }

        const body = ctx.request.body();

        if (body.type !== "json") {
            ctx.throw(Status.BadRequest, "Bad Request");
        } else {
            _data = await body.value;
        }

        let query = await queryGraphQL(false, Configs).then((res) => res.data.getConfigs);

        let pull = await queryGraphQL(false, Configs).then((res) => res.data.getConfigs.pull_LiveBroadcast);

        if (_data ?. pull_LiveBroadcast !== pull) {
            await mutateDQL(upsertConfig);
        }

        let _continue = _data.continue;

        (async () => {

            let obj = new YouTube(query.API_Token, query.access_token);

            while (_continue == true) {

                try {
                    const liveChat = await getLives(obj, "liveChat_list", {
                        part: "snippet",
                        liveChatId: _data.liveChatId
                    })

                } catch (e) {
                    console.log("Message => ", e.message);
                    console.log("Action  => ", "Break the loop. No data to be pulling.");
                    break;
                }

                await sleep(3000);
                _continue = _data.continue;

            }
        })();

        ctx.response.status = 200;
        ctx.response.body = "OK";

    }
};
