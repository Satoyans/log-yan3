"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edq = void 0;
const actor_1 = require("bdsx/bds/actor");
const sql_1 = require("../sql");
const types_1 = require("../types");
class emitDataQueryClass {
    static playerAttack(emitData) {
        const timestamp = getTimeStamp();
        const pos = emitData.pos;
        const x = Math.ceil(pos.x);
        const y = Math.ceil(pos.y);
        const z = Math.ceil(pos.z);
        const playerName = emitData.playerName;
        const victimId = emitData.victimId;
        const victimName = emitData.victimName;
        const dimensionId = actor_1.DimensionId[emitData.dimensionId];
        (0, sql_1.query)(`INSERT IGNORE INTO ${types_1.edt.queryText.playerAttack} ` +
            `VALUES("${timestamp}","${playerName}","${victimId}","${victimName}","${x}","${y}","${z}","${dimensionId}")`);
    }
    static entityDie(emitData) {
        const timestamp = getTimeStamp();
        const pos = emitData.pos;
        const x = Math.ceil(pos.x);
        const y = Math.ceil(pos.y);
        const z = Math.ceil(pos.z);
        const attackerId = emitData.attackerId;
        const attackerName = emitData.attackerName;
        const victimId = emitData.victimId;
        const victimName = emitData.victimName;
        const cause = emitData.cause;
        const dimensionId = actor_1.DimensionId[emitData.dimensionId];
        (0, sql_1.query)(`INSERT IGNORE INTO ${types_1.edt.queryText.entityDie} ` +
            `VALUES("${timestamp}","${attackerId}","${attackerName}","${victimId}","${victimName}","${cause}","${x}","${y}","${z}","${dimensionId}")`);
    }
    static blockContainer(emitData) {
        const timestamp = getTimeStamp();
        const pos = emitData.pos;
        const x = Math.ceil(pos.x);
        const y = Math.ceil(pos.y);
        const z = Math.ceil(pos.z);
        const playerName = emitData.playerName;
        const type = emitData.blockType;
        const action = emitData.action;
        const slot = emitData.slot;
        const itemId = emitData.itemId;
        const amount = emitData.itemAmount;
        const dimensionId = actor_1.DimensionId[emitData.dimensionId];
        (0, sql_1.query)(`INSERT IGNORE INTO ${types_1.edt.queryText.blockContainer} ` +
            `VALUES("${timestamp}","${playerName}","${type}","${slot}","${action}","${itemId}","${amount}","${x}","${y}","${z}","${dimensionId}")`);
    }
    static blockInteractedWith(emitData) {
        const timestamp = getTimeStamp();
        const pos = emitData.pos;
        const x = Math.ceil(pos.x);
        const y = Math.ceil(pos.y);
        const z = Math.ceil(pos.z);
        const blockName = emitData.blockName;
        const blockData = emitData.blockData;
        const playerName = emitData.playerName;
        const dimensionId = actor_1.DimensionId[emitData.dimensionId];
        (0, sql_1.query)(`INSERT IGNORE INTO ${types_1.edt.queryText.blockInteractedWith} ` +
            `VALUES("${timestamp}","${playerName}","${blockName}","${blockData}","${x}","${y}","${z}","${dimensionId}")`);
    }
    static itemThrow(emitData) {
        const timestamp = getTimeStamp();
        const playerName = emitData.playerName;
        const pos = emitData.pos;
        const x = Math.ceil(pos.x);
        const y = Math.ceil(pos.y);
        const z = Math.ceil(pos.z);
        const itemName = emitData.itemName;
        const dimensionId = actor_1.DimensionId[emitData.dimensionId];
        (0, sql_1.query)(`INSERT IGNORE INTO ${types_1.edt.queryText.itemThrow} ` +
            `VALUES("${timestamp}","${playerName}","${itemName}","${x}","${y}","${z}","${dimensionId}")`);
    }
    static blockPlace(emitData) {
        const timestamp = getTimeStamp();
        const pos = emitData.pos;
        const x = Math.ceil(pos.x);
        const y = Math.ceil(pos.y);
        const z = Math.ceil(pos.z);
        const playerName = emitData.playerName;
        const blockName = emitData.blockName;
        const blockData = emitData.blockData;
        const dimensionId = actor_1.DimensionId[emitData.dimensionId];
        (0, sql_1.query)(`INSERT IGNORE INTO ${types_1.edt.queryText.blockPlace} ` +
            `VALUES("${timestamp}","${playerName}","${blockName}","${blockData}","${x}","${y}","${z}","${dimensionId}")`);
    }
    static blockDestroy(emitData) {
        const timestamp = getTimeStamp();
        const pos = emitData.pos;
        const x = Math.ceil(pos.x);
        const y = Math.ceil(pos.y);
        const z = Math.ceil(pos.z);
        const playerName = emitData.playerName;
        const blockName = emitData.blockName;
        const blockData = emitData.blockData;
        const dimensionId = actor_1.DimensionId[emitData.dimensionId];
        (0, sql_1.query)(`INSERT IGNORE INTO ${types_1.edt.queryText.blockDestroy} ` +
            `VALUES("${timestamp}","${playerName}","${blockName}","${blockData}","${x}","${y}","${z}","${dimensionId}")`);
    }
    static lightningHitBlock(emitData) {
        const timestamp = getTimeStamp();
        const pos = emitData.pos;
        const x = Math.ceil(pos.x);
        const y = Math.ceil(pos.y);
        const z = Math.ceil(pos.z);
        const blockName = emitData.blockName;
        const blockData = emitData.blockData;
        const dimensionId = actor_1.DimensionId[emitData.dimensionId];
        (0, sql_1.query)(`INSERT IGNORE INTO ${types_1.edt.queryText.lightningHitBlock} ` +
            `VALUES("${timestamp}","${blockName}","${blockData}","${x}","${y}","${z}","${dimensionId}")`);
    }
    static getElytra(emitData) {
        const timestamp = getTimeStamp();
        const pos = emitData.pos;
        const x = Math.ceil(pos.x);
        const y = Math.ceil(pos.y);
        const z = Math.ceil(pos.z);
        const playerName = emitData.playerName;
        const dimensionId = actor_1.DimensionId[emitData.dimensionId];
        (0, sql_1.query)(`INSERT IGNORE INTO ${types_1.edt.queryText.getElytra} ` +
            `VALUES("${timestamp}","${playerName}","${x}","${y}","${z}","${dimensionId}")`);
    }
    static signBlockPlace(emitData) {
        const timestamp = getTimeStamp();
        const pos = emitData.pos;
        const x = Math.ceil(pos.x);
        const y = Math.ceil(pos.y);
        const z = Math.ceil(pos.z);
        const side = emitData.side;
        const playerName = emitData.playerName;
        const dimensionId = actor_1.DimensionId[emitData.dimensionId];
        const text = emitData.text;
        const id = emitData.id;
        (0, sql_1.query)(`INSERT IGNORE INTO ${types_1.edt.queryText.signBlockPlace} ` +
            `VALUES("${timestamp}","${playerName}","${id}","${side}","${text}","${x}","${y}","${z}","${dimensionId}")`);
    }
}
exports.edq = emitDataQueryClass;
;
function getTimeStamp() {
    let d = new Date();
    let timestamp = d.toLocaleString().split("‎").join("").replace("年", "-").replace("月", "-").replace("日", " ");
    return timestamp;
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1pdERhdGFRdWVyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVtaXREYXRhUXVlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMENBQStEO0FBRS9ELGdDQUErQjtBQUMvQixvQ0FBNkI7QUFFN0IsTUFBTSxrQkFBa0I7SUFDcEIsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUF5QjtRQUN6QyxNQUFNLFNBQVMsR0FBRyxZQUFZLEVBQUUsQ0FBQztRQUNqQyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDdkMsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNuQyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQ3ZDLE1BQU0sV0FBVyxHQUFHLG1CQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RELElBQUEsV0FBSyxFQUFDLHNCQUFzQixXQUFHLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRztZQUN6RCxXQUFXLFNBQVMsTUFBTSxVQUFVLE1BQU0sUUFBUSxNQUFNLFVBQVUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxXQUFXLElBQUksQ0FBQyxDQUFDO0lBQ2xILENBQUM7SUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQXNCO1FBQ25DLE1BQU0sU0FBUyxHQUFHLFlBQVksRUFBRSxDQUFDO1FBQ2pDLE1B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