"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryAsync = exports.query = void 0;
const event_1 = require("bdsx/event");
const mysql = require("mysql");
const dotenv_1 = require("dotenv");
const path = require("path");
(0, dotenv_1.config)({ path: path.join(__dirname, ".env") });
const sql_port = process.env.SQL_PORT;
const sql_pass = process.env.SQL_PASSWORD;
const sql_pass_db = process.env.SQL_DATABASE;
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: Number(sql_port),
    password: sql_pass,
    database: sql_pass_db
});
async function query(queryText, func) {
    try {
        let connection = await getConnection();
        connection.query(queryText, func);
    }
    catch (e) {
        console.error(e);
    }
    ;
}
exports.query = query;
function queryAsync(queryText) {
    return new Promise(async (resolve, reject) => {
        try {
            let connection = await getConnection();
            connection.query(queryText, (err, result, field) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        }
        catch (e) {
            console.error(e);
        }
        ;
    });
}
exports.queryAsync = queryAsync;
function getConnection() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err)
                reject(err);
            resolve(connection);
        });
    });
}
event_1.events.serverClose.on(() => {
    pool.end;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3FsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHNDQUFvQztBQUNwQywrQkFBK0I7QUFDL0IsbUNBQWdDO0FBQ2hDLDZCQUE2QjtBQUM3QixJQUFBLGVBQU0sRUFBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFL0MsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7QUFDdEMsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7QUFDMUMsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7QUFDN0MsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztJQUMxQixJQUFJLEVBQUUsV0FBVztJQUNqQixJQUFJLEVBQUUsTUFBTTtJQUNaLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ3RCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLFFBQVEsRUFBRSxXQUFXO0NBQ3hCLENBQUMsQ0FBQztBQUVILEtBQUssVUFBVSxLQUFLLENBQUMsU0FBaUIsRUFBRSxJQUFVO0lBQzlDLElBQUk7UUFDQSxJQUFJLFVBQVUsR0FBRyxNQUFNLGFBQWEsRUFBRSxDQUFDO1FBQ3ZDLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3JDO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUU7SUFBQSxDQUFDO0FBQ3JDLENBQUM7QUEyQkcsc0JBQUs7QUExQlQsU0FBUyxVQUFVLENBQUMsU0FBaUI7SUFDakMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3pDLElBQUk7WUFDQSxJQUFJLFVBQVUsR0FBRyxNQUFNLGFBQWEsRUFBRSxDQUFDO1lBQ3ZDLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBNEIsRUFBRSxNQUFXLEVBQUUsS0FBb0MsRUFBRSxFQUFFO2dCQUM1RyxJQUFJLEdBQUc7b0JBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUFFO1FBQUEsQ0FBQztJQUNyQyxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFpQkcsZ0NBQVU7QUFmZCxTQUFTLGFBQWE7SUFDbEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFO1lBQ25DLElBQUksR0FBRztnQkFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsY0FBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFO0lBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUE7QUFDWixDQUFDLENBQUMsQ0FBQyJ9