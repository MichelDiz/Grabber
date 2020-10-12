import { RouterContext, Status } from "../deps.ts";
import { mutateGraphQL, queryGraphQL } from "../helpers.ts";
import {
  addAccessTokenToken,
  addBasicCred,
  addSchema,
  Configs,
  Schema,
} from "../graphql/index.ts";

export default {
  setupSchema: async (ctx: RouterContext) => {
    let patch = { set: { schema: Schema} }
    await mutateGraphQL(true, addSchema, {patch});
    ctx.response.status = 200;
    ctx.response.body = "OK";
  },
  queryConfigs: async (ctx: RouterContext) => {
    await queryGraphQL(false, Configs).then((res) =>
      ctx.response.body = res.data.getConfigs
    );
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
      _data = _data.response.wc;
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
