function sendReq (method, route, body) {
    const token = localStorage.getItem("token");

    return fetch("http://localhost:4000/" + route, {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(body),
    })
}

function doDelete (route, body) {
    return sendReq("delete", route, body);
}

function doGet (route, body) {
    return sendReq("get", route, body);
}

function doPatch (route, body) {
    return sendReq("patch", route, body);
}

function doPost (route, body) {
    return sendReq("post", route, body);
}

export default {
    doDelete, doGet, doPatch, doPost
}