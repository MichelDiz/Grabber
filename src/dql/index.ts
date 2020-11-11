const decoder = new TextDecoder("utf-8");
const Root = `${Deno.cwd()}/src/dql`;

const basicConf = decoder.decode(
  await Deno.readFile(`${Root}/configs.rdf`),
);
const upsertConfig = decoder.decode(
  await Deno.readFile(`${Root}/configs.graphql`),
);

export { basicConf, upsertConfig };
