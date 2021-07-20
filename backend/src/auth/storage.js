import redis from "redis";

const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

function del (key) {
    return new Promise((resolve, reject) => {
        client.set(key, "none", (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

function set (key, value) {
    return new Promise((resolve, reject) => {
        client.set(key, value + "", (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

function get (key) {
    return new Promise((resolve, reject) => {
        client.get(key, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

export default { del, set, get }