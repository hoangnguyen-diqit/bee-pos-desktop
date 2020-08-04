import path from "path";
import fs from 'fs-extra';
import sqlite3 from 'sqlite3';
import { app } from "electron";

const sqlite3Client = sqlite3.verbose();

const dbPath = path.resolve(app.getPath('userData'), "databases");
fs.ensureDirSync(dbPath);
var db = new sqlite3Client.Database(dbPath + "/Databases.db");

export function initDB() {
    db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)");

        // var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
        // for (var i = 0; i < 10; i++) {
        //     stmt.run("Ipsum " + i);
        // }
        // stmt.finalize();

        // db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
        //     console.log(row.id + ": " + row.info);
        // });
    })
    db.close();
}

export default db;
