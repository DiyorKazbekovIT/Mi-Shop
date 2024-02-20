let HostAPI = "https://mi-shop-sever-api.onrender.com"

export const GetAPIFunc = (path) => {
    path = HostAPI + path
    return fetch(path).then(response => response.json())
}

export const PostDataFunc = (path, data) => {
    path = HostAPI + path
    return fetch(path, data).then(response => response.json())
}

export const DeleteDataFunc = (path) => {
    path = HostAPI + path
    return fetch(path, {
        method: "DELETE"
    }).then(response => response.json())
}

export const PatchDataFunc = (path, data) => {
    path = HostAPI + path
    return fetch(path, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    }).then(response => response.json())
}