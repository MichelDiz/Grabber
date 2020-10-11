import {
  authenticator,
  authParams,
  getQuery,
  Router,
  RouterContext,
  send,
  YouTube,
} from "./deps.ts";

import adminController from "./controllers/admin.ts";
import insertController from "./controllers/insert.ts";

const router = new Router();

let token = "W4qoPdqjtRG4qBzy2Y";
let obj = new YouTube("vpM", token);

// Isso tem que ir pra um controller
let auth = new authenticator();
let creds: authParams = {
  client_id: "0000-000.apps.googleusercontent.com",
  redirect_uri: "http://localhost:8008/?",
  scope: "https://www.googleapis.com/auth/youtube.readonly",
};

router
  .get("/configs", adminController.queryConfigs)
  .get("/autosetup", adminController.setupSchema)
  .post("/addconfigs", adminController.addConfigs)
  .post("/add", insertController.addObject);
//   .get("/", (ctx: RouterContext) => {
//     let { access_token } = getQuery(ctx, { mergeParams: true });
//     console.log(access_token);
//     console.log(getQuery(ctx, { mergeParams: true }));

//     ctx.response.body = ctx.request.url.searchParams;
//   })

// obj.search_list({part: "snippet", q: "coldplay"}).then(function(response: any){
//     console.log(response);
//    });

// obj.liveBroadcasts({
//     part: "snippet",
//     broadcastStatus: "active",
//     broadcastType: "all"}).then(function(response: any){
//     console.log(response);
//    });

// obj.liveChat({
//     part: "snippet",
//     liveChatId: "00000000"}).then(function(response: any){
//     console.log(response);
//    });

export default router;
