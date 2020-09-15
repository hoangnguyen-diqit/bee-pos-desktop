import path from "path";
import fs from "fs-extra";
import Datastore from "nedb";
import { app, ipcMain } from "electron";

fs.ensureDirSync(path.resolve(app.getPath('userData'), "data", "db"));
const db = new Datastore({
    filename: path.resolve(app.getPath('userData'), "data", "db", "shifttransactiondb"),
    autoload: true,
});

ipcMain.on("getShifts", (ev,) => {
    db.find({}, (err, docs) => {
        if (err) {
            console.log(err);
        }

        ev.sender.send("getShiftsResp", {
            orders: docs,
        })
    })
})

ipcMain.on("insertShifts", (ev, args) => {
    db.insert(args.orders, (err, newDocs) => {
        if (err) {
            console.log(err);
        }

        ev.sender.send("insertShiftsResp", {
            orders: newDocs,
        })
    })
})

export default db;
