import { query, queryAsync } from "../sql";
import * as mysql from "mysql";
import { sdt } from "../types";
import { VectorXYZ } from "bdsx/common";
import { DimensionId } from "bdsx/bds/actor";

class searchDataQueryClass {
    static async blockPlace(pos: VectorXYZ, dimensionId: DimensionId) {
        let logs: sdt.blockPlace[] = [];
        let query_a = `WHERE x = ${pos.x} AND y = ${pos.y} AND z = ${pos.z} AND dimension = "${DimensionId[dimensionId]}" LIMIT 30`;
        for (let data of await queryAsync(`SELECT * FROM logyan.blockplace ${query_a}`)) {
            logs.push({
                time: data.time,
                playerName: data.playerName,
                blockName: data.blockName,
                blockData: data.blockData,
                x: data.x,
                y: data.y,
                z: data.z,
                dimension: data.dimension,
                logtype: "blockPlace"
            })
        }
        return logs;
    };

    static async blockDestroy(pos: VectorXYZ, dimensionId: DimensionId) {
        let logs: sdt.blockDestroy[] = [];
        let query_a = `WHERE x = ${pos.x} AND y = ${pos.y} AND z = ${pos.z} AND dimension = "${DimensionId[dimensionId]}" LIMIT 30`;
        for (let data of await queryAsync(`SELECT * FROM logyan.blockdestroy ${query_a}`)) {
            logs.push({
                time: data.time,
                playerName: data.playerName,
                blockName: data.blockName,
                blockData: data.blockData,
                x: data.x,
                y: data.y,
                z: data.z,
                dimension: data.dimension,
                logtype: "blockDestroy"
            })
        }
        return logs;
    };

    static async blockContainer(pos: VectorXYZ, dimensionId: DimensionId) {
        let logs: sdt.blockContainer[] = [];
        let query_a = `WHERE x = ${pos.x} AND y = ${pos.y} AND z = ${pos.z} AND dimension = "${DimensionId[dimensionId]}" LIMIT 30`;
        for (let data of await queryAsync(`SELECT * FROM logyan.blockcontainer ${query_a}`)) {
            logs.push({
                time: data.time,
                playerName: data.playerName,
                type: data.type,
                slot: data.slot,
                action: data.action,
                itemId: data.itemId,
                amount: data.amount,
                x: data.x,
                y: data.y,
                z: data.z,
                dimension: data.dimension,
                logtype: "blockContainer"
            })
        }
        return logs;
    };

    static async blockInteractedWith(pos: VectorXYZ, dimensionId: DimensionId) {
        let logs: sdt.blockInteractedWith[] = [];
        let query_a = `WHERE x = ${pos.x} AND y = ${pos.y} AND z = ${pos.z} AND dimension = "${DimensionId[dimensionId]}" LIMIT 30`;
        for (let data of await queryAsync(`SELECT * FROM logyan.blockinteractedwith ${query_a}`)) {
            logs.push({
                time: data.time,
                playerName: data.playerName,
                blockName: data.blockName,
                blockData: data.blockData,
                x: data.x,
                y: data.y,
                z: data.z,
                dimension: data.dimension,
                logtype: "blockInteractedWith"
            })

        }
        return logs;
    };
    static async signBlockPlace(pos: VectorXYZ, dimensionId: DimensionId) {
        let logs: sdt.signBlockPlace[] = [];
        let query_a = `WHERE x = ${pos.x} AND y = ${pos.y} AND z = ${pos.z} AND dimension = "${DimensionId[dimensionId]}" LIMIT 30`;
        for (let data of await queryAsync(`SELECT * FROM logyan.signblockplace ${query_a}`)) {
            logs.push({
                time: data.time,
                playerName: data.playerName,
                text:data.text,
                id:data.id,
                side:data.side,
                x: data.x,
                y: data.y,
                z: data.z,
                dimension: data.dimension,
                logtype: "signBlockPlace"
            })

        }
        return logs;
    };
}


export {
    searchDataQueryClass as sdq
}