import { ActorDamageCause, DimensionId } from "bdsx/bds/actor";
import { events } from "bdsx/event";
import { query } from "../sql";
import {edt} from "../types";

class emitDataQueryClass{
    static playerAttack(emitData:edt.playerAttack){
        const timestamp = getTimeStamp();
        const pos = emitData.pos;
        const x = Math.ceil(pos.x);
        const y = Math.ceil(pos.y);
        const z = Math.ceil(pos.z);
        const playerName = emitData.playerName;
        const victimId = emitData.victimId;
        const victimName = emitData.victimName;
        const dimensionId = DimensionId[emitData.dimensionId];
        query(`INSERT IGNORE INTO ${edt.queryText.playerAttack} `+
        `VALUES("${timestamp}","${playerName}","${victimId}","${victimName}","${x}","${y}","${z}","${dimensionId}")`);
    }
    static entityDie(emitData:edt.entityDie){
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
        const dimensionId = DimensionId[emitData.dimensionId];
        query(`INSERT IGNORE INTO ${edt.queryText.entityDie} `+
        `VALUES("${timestamp}","${attackerId}","${attackerName}","${victimId}","${victimName}","${cause}","${x}","${y}","${z}","${dimensionId}")`);
    }
    static blockContainer(emitData:edt.blockContainer){
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
        const dimensionId = DimensionId[emitData.dimensionId];
        query(`INSERT IGNORE INTO ${edt.queryText.blockContainer} `+
        `VALUES("${timestamp}","${playerName}","${type}","${slot}","${action}","${itemId}","${amount}","${x}","${y}","${z}","${dimensionId}")`);
    }
    static blockInteractedWith(emitData:edt.blockInteractedWith){
        const timestamp = getTimeStamp();
        const pos = emitData.pos;
        const x = Math.ceil(pos.x);
        const y = Math.ceil(pos.y);
        const z = Math.ceil(pos.z);
        const blockName = emitData.blockName;
        const blockData = emitData.blockData;
        const playerName = emitData.playerName;
        const dimensionId = DimensionId[emitData.dimensionId];
        query(`INSERT IGNORE INTO ${edt.queryText.blockInteractedWith} `+
        `VALUES("${timestamp}","${playerName}","${blockName}","${blockData}","${x}","${y}","${z}","${dimensionId}")`);
    }
    static itemThrow(emitData:edt.itemThrow){
        const timestamp = getTimeStamp();
        const playerName = emitData.playerName;
        const pos = emitData.pos;
        const x = Math.ceil(pos.x);
        const y = Math.ceil(pos.y);
        const z = Math.ceil(pos.z);
        const itemName = emitData.itemName;
        const dimensionId = DimensionId[emitData.dimensionId];
        query(`INSERT IGNORE INTO ${edt.queryText.itemThrow} `+
        `VALUES("${timestamp}","${playerName}","${itemName}","${x}","${y}","${z}","${dimensionId}")`);
    }
    static blockPlace(emitData:edt.blockPlace){
        const timestamp = getTimeStamp();
        const pos = emitData.pos;
        const x = Math.ceil(pos.x);
        const y = Math.ceil(pos.y);
        const z = Math.ceil(pos.z);
        const playerName = emitData.playerName;
        const blockName = emitData.blockName;
        const blockData = emitData.blockData;
        const dimensionId = DimensionId[emitData.dimensionId];
        query(`INSERT IGNORE INTO ${edt.queryText.blockPlace} `+
        `VALUES("${timestamp}","${playerName}","${blockName}","${blockData}","${x}","${y}","${z}","${dimensionId}")`);
    }
    static blockDestroy(emitData:edt.blockDestroy){
        const timestamp = getTimeStamp();
        const pos = emitData.pos;
        const x = Math.ceil(pos.x);
        const y = Math.ceil(pos.y);
        const z = Math.ceil(pos.z);
        const playerName = emitData.playerName;
        const blockName = emitData.blockName;
        const blockData = emitData.blockData;
        const dimensionId = DimensionId[emitData.dimensionId];
        query(`INSERT IGNORE INTO ${edt.queryText.blockDestroy} `+
        `VALUES("${timestamp}","${playerName}","${blockName}","${blockData}","${x}","${y}","${z}","${dimensionId}")`);
    }
    static lightningHitBlock(emitData:edt.lightningHitBlock){
        const timestamp = getTimeStamp();
        const pos = emitData.pos;
        const x = Math.ceil(pos.x);
        const y = Math.ceil(pos.y);
        const z = Math.ceil(pos.z);
        const blockName = emitData.blockName;
        const blockData = emitData.blockData;
        const dimensionId = DimensionId[emitData.dimensionId];
        query(`INSERT IGNORE INTO ${edt.queryText.lightningHitBlock} `+
        `VALUES("${timestamp}","${blockName}","${blockData}","${x}","${y}","${z}","${dimensionId}")`);
    }
    static getElytra(emitData:edt.getElytra){
        const timestamp = getTimeStamp();
        const pos = emitData.pos;
        const x = Math.ceil(pos.x);
        const y = Math.ceil(pos.y);
        const z = Math.ceil(pos.z);
        const playerName = emitData.playerName;
        const dimensionId = DimensionId[emitData.dimensionId];
        query(`INSERT IGNORE INTO ${edt.queryText.getElytra} `+
        `VALUES("${timestamp}","${playerName}","${x}","${y}","${z}","${dimensionId}")`);
    }
    static signBlockPlace(emitData:edt.signBlockPlace){
        const timestamp = getTimeStamp();
        const pos = emitData.pos;
        const x = Math.ceil(pos.x);
        const y = Math.ceil(pos.y);
        const z = Math.ceil(pos.z);
        const side = emitData.side;
        const playerName = emitData.playerName;
        const dimensionId = DimensionId[emitData.dimensionId];
        const text = emitData.text;
        const id = emitData.id;
        query(`INSERT IGNORE INTO ${edt.queryText.signBlockPlace} `+
        `VALUES("${timestamp}","${playerName}","${id}","${side}","${text}","${x}","${y}","${z}","${dimensionId}")`);
    }
};

function getTimeStamp() {
    let d = new Date();
    let timestamp = d.toLocaleString().split("‎").join("").replace("年", "-").replace("月", "-").replace("日", " ");
    return timestamp;
};

export {emitDataQueryClass as edq}