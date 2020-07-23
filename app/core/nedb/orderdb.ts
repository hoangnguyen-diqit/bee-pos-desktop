import path from "path";
import Datastore from "nedb";

const db = new Datastore({ filename: path.resolve(process.cwd(), "data", "orderdb"), autoload: true });

export default db;
