import cors from "cors";
import express from "express";
import NodeMediaServer from "node-media-server";
import { getUserByKey } from "./users/user.service";
import request from "request";

const app = express();

const streams = new Map();
const keys = new Map();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.get('/isstream/:username', (req , res) => { 
   res.json({
       result: streams.has(req.params.username)
   })
});

app.get("/getstream/:username", (req, res) => {
    const username = req.params.username;
    const key = streams.get(username);

    if (!key) {
        res.status(404).end();
    } else {
        request({
            url: "http://localhost:" + process.env.MEDIA_PORT + "//" + key + ".flv",
            method: req.query.method
          }).pipe(res);
    }
});

const nms = new NodeMediaServer({
    logType: 3,
    rtmp: {
      port: 1935,
      chunk_size: 60000,
      gop_cache: true,
      ping: 30,
      ping_timeout: 60
    },
    http: {
      port: process.env.MEDIA_PORT,
      allow_origin: '*',
      mediaroot: './media',
    },
    trans: {
        ffmpeg: process.env.FFMPEG,
        tasks: [
            {
                app: 'live', // or other 
                hls: true,
                hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                dash: true,
                dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
                "websocket-flv": true
            }
        ]
    }
})

nms.on('prePublish', async (id, StreamPath, args) => {
    const key = StreamPath.replace(/\//g, "");
    const user = await getUserByKey(key);

    if (!user) {
        let session = nms.getSession(id);
        session.reject();
        console.log('[PrePublish] Invalid key ' + key);
    } else {
        streams.set(user.username, key);
        keys.set(key, user.username);
        console.log('[PrePublish] Start Stream ' + user.username + " with key " + key);
    }
});

nms.on('donePublish', (id, StreamPath, args) => {
    const key = StreamPath.replace(/\//g, "");
    const user = keys.get(key);

    keys.delete(key);
    streams.delete(user);

    console.log("[DonePublish] End stream for " + user + " with key " + key);
});

nms.run();
export default app;
