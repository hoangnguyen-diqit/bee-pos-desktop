import express from "express";

export function IndexRouter() {
    const router = express.Router();

    router.route("/")
        .get(async(req, res) => {
            const world = req.query.name
            res.send(`Hello ${world}`);
        })

    return router;
}
