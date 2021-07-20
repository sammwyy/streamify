export function sanitizeUserPublic (user) {
    const { username, _id, streamTitle } = user;
    return {
        username,
        id: _id,
        streamTitle
    }
}

export function sanitizeUserPrivate (user) {
    const { email, key } = user;

    return {
        ...sanitizeUserPublic(user),
        email, key
    }
}