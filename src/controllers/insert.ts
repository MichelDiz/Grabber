import { RouterContext, Status } from "../deps.ts";
import { mutateGraphQL, queryGraphQL } from "../helpers.ts";


export default {
  addObject: async (ctx: RouterContext) => {
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
    console.log(_data);
    //await mutateGraphQL(false, addSchema);
    ctx.response.status = 200;
    ctx.response.body = "OK";
  },
};
