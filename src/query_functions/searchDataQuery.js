"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sdq = void 0;
const sql_1 = require("../sql");
const actor_1 = require("bdsx/bds/actor");
class searchDataQueryClass {
    static async blockPlace(pos, dimensionId) {
        let logs = [];
        let query_a = `WHERE x = ${pos.x} AND y = ${pos.y} AND z = ${pos.z} AND dimension = "${actor_1.DimensionId[dimensionId]}" LIMIT 30`;
        for (let data of await (0, sql_1.queryAsync)(`SELECT * FROM logyan.blockplace ${query_a}`)) {
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
            });
        }
        return logs;
    }
    ;
    static async blockDestroy(pos, dimensionId) {
        let logs = [];
        let query_a = `WHERE x = ${pos.x} AND y = ${pos.y} AND z = ${pos.z} AND dimension = "${actor_1.DimensionId[dimensionId]}" LIMIT 30`;
        for (let data of await (0, sql_1.queryAsync)(`SELECT * FROM logyan.blockdestroy ${query_a}`)) {
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
            });
        }
        return logs;
    }
    ;
    static async blockContainer(pos, dimensionId) {
        let logs = [];
        let query_a = `WHERE x = ${pos.x} AND y = ${pos.y} AND z = ${pos.z} AND dimension = "${actor_1.DimensionId[dimensionId]}" LIMIT 30`;
        for (let data of await (0, sql_1.queryAsync)(`SELECT * FROM logyan.blockcontainer ${query_a}`)) {
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
            });
        }
        return logs;
    }
    ;
    static async blockInteractedWith(pos, dimensionId) {
        let logs = [];
        let query_a = `WHERE x = ${pos.x} AND y = ${pos.y} AND z = ${pos.z} AND dimension = "${actor_1.DimensionId[dimensionId]}" LIMIT 30`;
        for (let data of await (0, sql_1.queryAsync)(`SELECT * FROM logyan.blockinteractedwith ${query_a}`)) {
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
            });
        }
        return logs;
    }
    ;
    static async signBlockPlace(pos, dimensionId) {
        let logs = [];
        let query_a = `WHERE x = ${pos.x} AND y = ${pos.y} AND z = ${pos.z} AND dimension = "${actor_1.DimensionId[dimensionId]}" LIMIT 30`;
        for (let data of await (0, sql_1.queryAsync)(`SELECT * FROM logyan.signblockplace ${query_a}`)) {
            logs.push({
                time: data.time,
                playerName: data.playerName,
                text: data.text,
                id: data.id,
                side: data.side,
                x: data.x,
                y: data.y,
                z: data.z,
                dimension: data.dimension,
                logtype: "signBlockPlace"
            });
        }
        return logs;
    }
    ;
}
exports.sdq = searchDataQueryClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoRGF0YVF1ZXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VhcmNoRGF0YVF1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGdDQUEyQztBQUkzQywwQ0FBNkM7QUFFN0MsTUFBTSxvQkFBb0I7SUFDdEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBYyxFQUFFLFdBQXdCO1FBQzVELElBQUksSUFBSSxHQUFxQixFQUFFLENBQUM7UUFDaEMsSUFBSSxPQUFPLEdBQUcsYUFBYSxHQUFHLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMscUJBQXFCLG1CQUFXLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztRQUM1SCxLQUFLLElBQUksSUFBSSxJQUFJLE1BQU0sSUFBQSxnQkFBVSxFQUFDLG1DQUFtQyxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQzdFLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ04sSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNmLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtnQkFDM0IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO2dCQUN6QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0JBQ3pCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDVCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ1QsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNULFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDekIsT0FBTyxFQUFFLFlBQVk7YUFDeEIsQ0FBQyxDQUFBO1NBQ0w7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQUEsQ0FBQztJQUVGLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQWMsRUFBRSxXQUF3QjtRQUM5RCxJQUFJLElBQUksR0FBdUIsRUFBRSxDQUFDO1FBQ2xDLElBQUksT0FBTyxHQUFH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