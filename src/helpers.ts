export const queryGraphQL = async (
  isAdmin?: boolean,
  query?: any,
  vars?: any,
) => {
  let URL = isAdmin
    ? "http://localhost:8080/admin"
    : "http://localhost:8080/graphql";
  function handleErrors(res: any) {
    if (!res.ok) {
      console.error("Got error from Dgraph's GraphQL API");
      throw res.status;
    }
    return res;
  }
  return await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      vars
        ? { query: `${query}`, "variables": `${vars}` }
        : { query: `${query}` },
    ),
  }).then(handleErrors).then((res) => res.json()).then((res) => {
    console.log(res);
    return res;
  });
};

export const mutateGraphQL = async (
  isAdmin?: boolean,
  query?: any,
  variables?: any,
) => {
  console.log("isAdmin?:", isAdmin);
  let URL = isAdmin
    ? "http://localhost:8080/admin"
    : "http://localhost:8080/graphql";
  function handleErrors(res: any) {
    if (!res.ok) {
      console.error("Got error from Dgraph's GraphQL API");
      throw res.status;
    }
    return res;
  }
  console.log(JSON.stringify(
    variables ? { query: `${query}`, variables } : { query: `${query}` },
  ));
  return await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      variables ? { query: `${query}`, variables } : { query: `${query}` },
    ),
  }).then(handleErrors).then((res) => res.json()).then((res) => {
    console.log(res);
    return res;
  });
};

export const mutateDQL = async () => {
  let URL = "http://localhost:8080/mutate?commitNow=true";
  function handleErrors(res: any) {
    if (!res.ok) {
      console.error("Got error from Dgraph's GraphQL API");
      throw res.status;
    }
    return res;
  }
  return await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/rdf",
    },
    body: `{
      set {
        <0x1> <dgraph.type> "Configs" .
      }
    }`,
  }).then(handleErrors).then((res) => res.json()).then((res) => {
    console.log(res);
    return res;
  });
};
