import path from "path";
import fs from "fs-extra";
import Datastore from "nedb";
import { app } from "electron";

console.log(app.getPath('userData'));
// fs.ensureDirSync(path.resolve(remote.app.getPath('userData'), "data", "db"));
const db = new Datastore({
    filename: path.resolve(app.getPath('userData'), "data", "db", "orderdb"),
    autoload: true,
});

export default db;
