import {RouterContext, Status, YouTube} from "../deps.ts";
import {mutateDQL, mutateGraphQL, queryGraphQL} from "../helpers.ts";
import {addLiveBroadcast, Configs} from "../graphql/index.ts";
import {upsertConfig} from "../dql/index.ts";

const sleep = async function (duration : number) {
    await new Promise((r) => setTimeout(r, duration));
};

const getLives = (obj : any, param : any) => obj.liveBroadcasts({part: "snippet", broadcastStatus: "active", broadcastType: "all"}).then(function (response : any) {
    if (response.error) 
        throw new Error(`${
            response.error.message
        }`);
    return response;
});

const getLiveChat = ({obj, ChatId} : any) => obj.liveChat({part: "snippet", liveChatId: ChatId}).then(function (response : any) {
    if (response.error) 
        throw new Error(`${
            response.error.message
        }`);
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

        console.log(_data)

        let query = await queryGraphQL(false, Configs).then((res) => res.data.getConfigs);

        if (_data ?. pull_LiveBroadcast !== query.pull_LiveBroadcast) {
            await mutateDQL(upsertConfig);
        }

        (async () => {

            let obj = new YouTube(query.API_Token, query.access_token);
            let _pull = true;

            while (_pull) {
                try {
                    const addInput = await getLives(obj, "").then((e : any) => e.items[0]).then(async function (response : any) {
                        const {
                            snippet: {
                                title,
                                publishedAt,
                                liveChatId
                            },
                            id
                        } = response;

                        const liveChat = await getLiveChat({obj, ChatId: liveChatId});

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

        let pull = await queryGraphQL(false, Configs).then((res) => res.data.getConfigs.pull_LiveBroadcast);

        if (_data ?. pull_LiveBroadcast !== pull) {
            await mutateDQL(upsertConfig);
        }

        let _continue = _data.continue;
        (async () => {
            let _continue2 = false;
            while (_continue2 == true) {

                await sleep(2000);
                _continue2 = _continue;

            }
        })();

        ctx.response.status = 200;
        ctx.response.body = "OK";

    }
};
