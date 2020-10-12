const decoder = new TextDecoder("utf-8");
const Root = `${Deno.cwd()}/src/graphql`;

const Schema = decoder.decode(
  await Deno.readFile(`${Root}/schema.graphql`),
);
const Configs = decoder.decode(
  await Deno.readFile(`${Root}/configs.graphql`),
);
const addAccessTokenToken = decoder.decode(
  await Deno.readFile(`${Root}/addAccessTokenToken.graphql`),
);
const addBasicCred = decoder.decode(
  await Deno.readFile(`${Root}/addBasicCred.graphql`),
);
const addSchema = decoder.decode(
  await Deno.readFile(`${Root}/addSchema.graphql`),
);
// console.log(JSON.stringify(text) )
// console.log(JSON.stringify(Configs) )

export { addAccessTokenToken, addBasicCred, addSchema, Configs, Schema };
