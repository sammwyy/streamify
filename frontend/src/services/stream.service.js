export async function isStream (username) {
    const req = await fetch("http://localhost:5000/isstream/" + username);
    const res = await req.json();
    console.log(res);
    return res.result;
}