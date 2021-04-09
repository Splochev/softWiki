function getOptions(method, body, token) {
    if (token) {
        switch (method) {
            case "delete":
                return {
                    method: "delete",
                    headers: { /*'Content-Type': 'application/json', */'X-Authorization': token }
                };

            case "post":
                return {
                    method: "post",
                    headers: { 'Content-Type': 'application/json', 'X-Authorization': token },
                    body: JSON.stringify(body) //BODY MUST BE AN OBJECT
                };

            case "put":
                return {
                    method: "put",
                    headers: { 'Content-Type': 'application/json', 'X-Authorization': token },
                    body: JSON.stringify(body) //BODY MUST BE AN OBJECT
                };

            case "get":
                return {
                    method: "get",
                    headers: { 'Content-Type': 'application/json','X-Authorization': token }
                }
        }
    } else {
        switch (method) {
            case "delete":
                return {
                    method: "delete"//,
                    //headers: { 'Content-Type': 'application/json' }
                };

            case "post":
                return {
                    method: "post",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body) //BODY MUST BE AN OBJECT
                };

            case "put":
                return {
                    method: "put",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body) //BODY MUST BE AN OBJECT
                };

            case "get":
                return {
                    method: "get"//,
                    //headers: { 'Content-Type': 'application/json' }
                }
        }
    }
}

export async function request(url, method, body, tokenAuth) {
    let options = getOptions(method, body, tokenAuth);
    let response = await fetch(url, options);

    if (response.ok != true) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }

    try{
    const data = await response.json();
    return data;
    } catch(err){
        return;
    }
}
