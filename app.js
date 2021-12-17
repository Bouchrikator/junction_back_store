if (!process.env.PORT) await import("dotenv").then((dotenv) => dotenv.config());

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import store from "./Routes/store.js";
import product from "./Routes/product.js";

const app = express();

// parsers + cors
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: (origin, callback) => {
            const accepted_origins = [origin];
            const origin_accepted = accepted_origins.includes(origin);
            callback(!origin_accepted && new Error("Request origin not accepted."), origin_accepted && origin);
        },
        credentials: true,
    })
);

app.use("/", store);
app.use("/product", product);
// error middleware
app.use((err, req, res, next) => {
    //log.error(err);
    const error = err.message && err.name ? { err: err.name, msg: err.message } : "unhandled_error";
    res.status(err.status || 422).send(error);
});

app.use("*", (req, res, next) => {
    res.status(404).send(resource_not_found);
});
//mongoose.set("debug", false); // debug mode is useless, it just throws blocks of unreadable data at you that takes a decade to scroll through
mongoose
    .connect(
        process.env.DB_URL //`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ioc-cluster.y8dpz.mongodb.net/ioc_event?retryWrites=true&w=majority`, // Current: impactOfCode
    )
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("server started at " + process.env.PORT);
        });
    })
    .catch((err) => {
        //log.error(err);
        console.log("Error happened during connection: ", err);
    });
