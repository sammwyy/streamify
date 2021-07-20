const dotenv = require("dotenv");
dotenv.config({path: `./environments/${process.env.NODE_ENV}.env`});

import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    const { HOST, PORT } = process.env;
    const app = require("./app")["default"];

    app.listen(PORT, HOST, () => {
        console.log(`Server listening at http://${HOST}:${PORT}/`);
    });
});