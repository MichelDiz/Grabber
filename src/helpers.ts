export const queryGraphQL = async (isAdmin?: boolean, query?: any) => {
    let URL =  isAdmin ? 'http://localhost:8080/admin':'http://localhost:8080/graphql';
    function handleErrors(res: any) {
        if (! res.ok) {
            console.error("Got error from Dgraph's GraphQL API")
            throw res.status;
        }
        return res;
    }
    return await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {query: `${query}`}
        )
    }).then(handleErrors).then(res => res.json())
  }
  
  export const mutateGraphQL = async (isAdmin?: boolean, query?: any) => {
    console.log("isAdmin?:",isAdmin);
    let URL =  isAdmin ? 'http://localhost:8080/admin':'http://localhost:8080/graphql';
    function handleErrors(res: any) {
        if (! res.ok) {
            console.error("Got error from Dgraph's GraphQL API")
            throw res.status;
        }
        return res;
    }
    return await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {query: `${query}`}
        )
    }).then(handleErrors).then(res => res.json()).then(res => res)
  }