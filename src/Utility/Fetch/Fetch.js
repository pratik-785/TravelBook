
export const GetFetch = async (fetchURL, headerType) => {

    let headers = null;
    if (headerType === 'withoutAuth') {
        headers = {
            'Content-Type': 'application/json',
        };
    } else {
        const userToken = await getValue('userToken');
        headers = {
            'authToken': `${userToken}`
        };
    }

    const fetchCall = await fetch(fetchURL, {
        method: "GET",
        headers: headers,
    })

    const response = await fetchCall.json();
    console.log("response---------->", response);
    return response;
}


export const PostFetch = async (fetchURL, fetchBodyData, auth) => {
    let headers = null;
    let fetchData = null;

    if (auth === 'withoutAuth') {
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    } else {
        const userToken = getValue('userToken');
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authToken': `${userToken}`
        }
    }
    fetchData = JSON.stringify(fetchBodyData)

    const fetchCall = await fetch(fetchURL, {
        method: "POST",
        headers: headers,
        body: fetchData
    })

    const response = await fetchCall.json();
    console.log("response---------->", response);
    return response;
}

export const PutFetch = async (fetchURL, fetchBodyData, auth) => {
    let headers = null;
    let fetchData = null;

    if (auth === 'withoutAuth') {
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    } else {
        const userToken = getValue('userToken');
        headers = {
            'Content-Type': 'application/json',
            'authToken': `${userToken}`
        }
    }
    fetchData = JSON.stringify(fetchBodyData)

    const fetchCall = await fetch(fetchURL, {
        method: "PUT",
        headers: headers,
        body: fetchData
    })

    const response = await fetchCall.json();
    console.log("response---------->", response);
    return response;
}