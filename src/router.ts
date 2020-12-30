import {
  authenticator,
  authParams,
  getQuery,
  Router,
  RouterContext,
  send,
} from "./deps.ts";

import adminController from "./controllers/admin.ts";
import insertController from "./controllers/insert.ts";

const router = new Router();

router
  .get("/configs", adminController.queryConfigs)
  .get("/autosetup", adminController.setupSchema)
  .post("/addconfigs", adminController.addConfigs)
  .post("/add", insertController.watchLives);
//   .get("/", (ctx: RouterContext) => {
//     let { access_token } = getQuery(ctx, { mergeParams: true });
//     console.log(access_token);
//     console.log(getQuery(ctx, { mergeParams: true }));

//     ctx.response.body = ctx.request.url.searchParams;
//   })

// obj.search_list({part: "snippet", q: "coldplay"}).then(function(response: any){
//     console.log(response);
//    });


export default router;
