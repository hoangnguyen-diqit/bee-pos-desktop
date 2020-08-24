import path from "path";
import fs from "fs-extra";
import Datastore from "nedb";
import { app, ipcMain } from "electron";

fs.ensureDirSync(path.resolve(app.getPath('userData'), "data", "db"));
const db = new Datastore({
    filename: path.resolve(app.getPath('userData'), "data", "db", "orderdb"),
    autoload: true,
});

ipcMain.on("getOrders", (ev, args) => {
    db.find({}, (err, docs) => {
        if (err) {
            console.log(err);
        }

        ev.sender.send("getOrdersResp", {
            orders: docs,
        })
    })
})

ipcMain.on("insertOrders", (ev, args) => {
    db.insert(args.orders, (err, newDocs) => {
        if (err) {
            console.log(err);
        }

        ev.sender.send("insertOrdersResp", {
            orders: newDocs,
        })
    })
})

export default db;
