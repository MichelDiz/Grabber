export const queryGraphQL = async (
  isAdmin?: boolean,
  query?: any,
  vars?: any,
  logs?: any,
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
    logs ? console.log(res) : null;
    return res;
  });
};

export const mutateGraphQL = async (
  isAdmin?: boolean,
  query?: any,
  variables?: any,
  logs?: any,
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
    logs ? console.log(res) : null;
    return res;
  });
};

export const mutateDQL = async (mutation: any, logs?: any) => {
  let URL = "http://localhost:8080/mutate?commitNow=true";
  let ZERO = "http://localhost:6080/assign?what=uids&num=2";

  function handleErrors(res: any) {
    if (!res.ok) {
      console.error("Got error from Dgraph's GraphQL API");
      throw res.status;
    }
    return res;
  }

  fetch(ZERO, { method: "GET" }); //This is a hack baby

  return await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/rdf",
    },
    body: `${mutation}`,
  }).then(handleErrors).then((res) => res.json()).then((res) => {
    logs ? console.log(res) : null;
    return res;
  });
};
