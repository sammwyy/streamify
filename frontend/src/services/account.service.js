import api from "../utils/api.utils";

export async function editAccount (fields) {
    const res = await api.doPost("users/edit", fields);
    const body = await res.json();
    return body;
}

export async function findAccountByName (name) {
    const res = await api.doGet("users/find?username=" + name);
    const body = await res.json();
    return body;
}