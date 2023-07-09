import { events } from 'bdsx/event';
import * as mysql from 'mysql';
import { config } from "dotenv";
import * as path from "path";
config({ path: path.join(__dirname, ".env") });

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

async function query(queryText: string, func?: any) {
    try {
        let connection = await getConnection();
        connection.query(queryText, func);
    } catch (e) { console.error(e) };
}
function queryAsync(queryText: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            let connection = await getConnection();
            connection.query(queryText, (err: mysql.MysqlError | null, result: any, field: mysql.FieldInfo[] | undefined) => {
                if (err) reject(err);
                resolve(result);
            });
        } catch (e) { console.error(e) };
    })
}

function getConnection(): Promise<mysql.PoolConnection> {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) reject(err);
            resolve(connection);
        });
    });
}

events.serverClose.on(() => {
    pool.end
});

/*
(function handleDisconnect() {//即時間数
    connection.connect((err: any) => {
        if (err) {
            console.log('ERROR.CONNECTION_DB: ', err);
            setTimeout(() => { handleDisconnect }, 1000);
        }
    });

    //error('PROTOCOL_CONNECTION_LOST')時に再接続
    connection.on('error', (err: { code: string; }) => {
        console.log('ERROR.DB: ', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('ERROR.CONNECTION_LOST'.yellow);
            handleDisconnect();
        } else {
            throw err;
        }
    });
})();
*/

export {
    query,
    queryAsync
}