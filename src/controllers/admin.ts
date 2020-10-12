import { RouterContext, Status } from "../deps.ts";
import { mutateGraphQL, queryGraphQL } from "../helpers.ts";

let query = `query test1{
    getConfigs(id: "0x1"){
      id
      API_Token
      Client_ID
    }
    }`;

let addSchema = `mutation {
    updateGQLSchema(
      input: { set: { schema: "type Configs { id: ID! , API_Token: String, Client_ID: String expires_at: Int, access_token: String, expires_in: String, first_issued_at: String }"}})
    {
      gqlSchema {
        generatedSchema
      }
    }
  }`;

let addAccessTokenToken = `mutation($patch: UpdateConfigsInput!) {
    updateConfigs(input: $patch ) {
      configs {
        id
        access_token
        expires_at
      }
    }
 }`;

 let addBasicCred = `mutation($patch: UpdateConfigsInput!) {
  updateConfigs(input: $patch ) {
    configs {
      id
      API_Token
      Client_ID
    }
  }
}`;

export default {
  setupSchema: async (ctx: RouterContext) => {
    await mutateGraphQL(true, addSchema);
    ctx.response.status = 200;
    ctx.response.body = "OK";
  },
  queryConfigs: async (ctx: RouterContext) => {
    await queryGraphQL(false, query).then((res) =>
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
      console.log("primeiro")
      _data = _data.response.wc;
      console.log("_data", _data)
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
      console.log("segundo")
      _data = _data.response;
      let { API_Token, Client_ID } = _data;
      console.log("_data", _data)
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
