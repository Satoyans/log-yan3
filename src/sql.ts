import { events } from 'bdsx/event';
import * as mysql from 'mysql';
import {config} from "dotenv";
import * as path from "path";
config({path:path.join(__dirname,".env")});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
});

function query(queryText: string, func?: any) {
    try {
        //deleteOldLog();
        connection.query(queryText, func);
    } catch (e) { console.error(e) };
}
function queryAsync(queryText: string):Promise<any> {
    return new Promise((resolve, reject) => {
        try {
            connection.query(queryText, (err: mysql.MysqlError | null, result: any, field: mysql.FieldInfo[] | undefined) => {
                if (err == null) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        } catch (e) { console.error(e) };
    })
}

var lastDelTime = new Date().getTime();
const time_to_delete = 3 * 30 * 24 * 60 * 60 * 1000//3 month
const deleteOldLog = () => {
    if ((new Date().getTime() - lastDelTime) < 15 * 60 * 1000) return;
    let timeobj = new Date(new Date().getTime() - time_to_delete);
    let timestr = `${timeobj.getFullYear()}-${('0' + (Number(timeobj.getMonth()) + 1)).slice(-2)}-${('0' + timeobj.getDate()).slice(-2)} ${('0' + timeobj.getHours()).slice(-2)}:${('0' + timeobj.getMinutes()).slice(-2)}:${('0' + timeobj.getSeconds()).slice(-2)}`;
    console.log("[Log-Yan]ログの削除を実行します。")
    console.log("～" + timestr + "(" + (new Date().getTime() - lastDelTime) / 1000 / 60 + ")分")
    lastDelTime = new Date().getTime();
    for (let table of ["blockcontainer", "blockdestroy", "blockinteractedwith", "blockplace", "entitydie", "itemthrow", "playerattack"]) {
        //not delete table (getElytra/lightningHitBlock)
        connection.query("DELETE FROM `logyan`.`" + table + "` WHERE `time` < '" + timestr + "';");
    }
}

events.serverClose.on(() => {
    connection.destroy();
});

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

events.serverClose.on(() => {
    connection.destroy();
});


export {
    query,
    queryAsync
}