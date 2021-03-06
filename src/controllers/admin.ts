import { RouterContext, Status } from "../deps.ts";
import { mutateDQL, mutateGraphQL, queryGraphQL } from "../helpers.ts";
import { basicConf } from "../dql/index.ts";
import {
  addAccessTokenToken,
  addBasicCred,
  addSchema,
  Configs,
  Schema,
} from "../graphql/index.ts";

export default {
  setupSchema: async (ctx: RouterContext) => {
    await mutateDQL(basicConf);
    let patch = { set: { schema: Schema } };
    let res = await mutateGraphQL(true, addSchema, { patch });
    console.log(res)
    console.log(res?.errors[0].message)
    ctx.response.status = 200;
    ctx.response.body = "OK";
  },
  queryConfigs: async (ctx: RouterContext) => {
    let res = await queryGraphQL(false, Configs).then((res) => res);
    if (res.errors) {
      ctx.response.status = 503;
      console.log(res)
      return
    }
    ctx.response.body = res.data;
    ctx.response.status = 200;
    ctx.response.type = "application/json";
  },
  addConfigs: async (ctx: RouterContext) => {
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
    
    if (!_data?.response?.API_Token) {
      _data = _data.response.tokenObj;
      let { access_token, expires_in, expires_at } = _data;
      let update = {
        patch: {
          filter: {
            id: ["0x1"],
          },
          set: { access_token, expires_in, expires_at },
        },
      };
      await mutateGraphQL(false, addAccessTokenToken, update);
    } else {
      _data = _data.response;
      let { API_Token, Client_ID } = _data;
      let update = {
        patch: {
          filter: {
            id: ["0x1"],
          },
          set: { API_Token, Client_ID },
        },
      };
      await mutateGraphQL(false, addBasicCred, update);
    }
    ctx.response.status = 200;
    ctx.response.body = "OK";
  },
};
