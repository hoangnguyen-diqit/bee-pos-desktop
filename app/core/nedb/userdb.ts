import path from "path";
import fs from "fs-extra";
import Datastore from "nedb";
import { remote } from "electron";

// fs.ensureDirSync(path.resolve(remote.app.getPath('userData'), "data", "db"));
const db = new Datastore({
    filename: path.resolve(remote.app.getPath('userData'), "data", "db", "userdb"),
    autoload: true,
});

export default db;
