import express from "express";

export function IndexRouter() {
    const router = express.Router();

    router.route("/")
        .get(async(req, res, next) => {
            res.send("Hello world");
        })

    return router;
}
