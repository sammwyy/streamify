import api from "../utils/api.utils";

export async function logout () {
    await api.doGet("auth/logout");
    localStorage.removeItem("token");
}

export async function login (username, password) {
    const res = await api.doPost("auth/login", { username, password});
    const body = await res.json();

    if (body.success) {
        const { token, user } = body;
        localStorage.setItem("token", token);
        return { success: true, user }
    } else {
        return { success: false, error: body.message }
    }
}

export async function register (username, email, password) {
    const res = await api.doPost("users/register", { username, email, password});
    const body = await res.json();

    if (body.success) {
        return { success: true }
    } else {
        return { success: false, error: body.message }
    }
}

export async function getSession () {
    const res = await api.doGet("users/me");
    const body = await res.json();

    if (body.success) {
        return body.user;
    } else {
        return null;
    }
}