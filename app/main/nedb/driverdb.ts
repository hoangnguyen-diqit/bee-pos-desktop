import path from "path";
import fs from "fs-extra";
import Datastore from "nedb";
import { app } from "electron";

fs.ensureDirSync(path.resolve(app.getPath('userData'), "data", "db"));
const db = new Datastore({
    filename: path.resolve(app.getPath('userData'), "data", "db", "driverdb"),
    autoload: true,
});

export default db;
