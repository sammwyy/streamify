import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({path: `./environments/${process.env.NODE_ENV}.env`});

mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    const { HOST, PORT } = process.env;

    app.listen(PORT, HOST, () => {
        console.log(`Server listening at http://${HOST}:${PORT}/`);
    });
});