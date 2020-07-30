import path from "path";
import Datastore from "nedb";
import { app, ipcMain } from "electron";

console.log(app.getPath('userData'));
// fs.ensureDirSync(path.resolve(remote.app.getPath('userData'), "data", "db"));
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

ipcMain.on("insertOrder", (ev, args) => {
    db.insert(args.users, (err, newDocs) => {
        if (err) {
            console.log(err);
        }

        ev.sender.send("insertOrderResp", {
            orders: newDocs,
        })
    })
})

export default db;
