import cpos3, { initDB } from "./sqlite3-client";

export {
    cpos3,
}

export function loadSqlite3Db() {
    initDB();
};
