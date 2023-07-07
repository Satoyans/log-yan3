
import { ActorDamageCause, ActorType, DimensionId } from "bdsx/bds/actor"
import { BlockPos, Vec3 } from "bdsx/bds/blockpos"
type playerAttack = {
    loc:Vec3
    playerName:string
    victimId:keyof typeof ActorType
    victimName:string
    dimensionId:DimensionId
}
type entityDie = {
    loc:Vec3
    //Cause of death not involving an entity e.g.) fire, fall, void.
    attackerId:keyof typeof ActorType | undefined
    attackerName:string
    victimId:keyof typeof ActorType
    victimName:string
    cause:keyof typeof ActorDamageCause
    dimensionId:DimensionId
}
type blockContainer = {
    blockType:string
    pos:BlockPos
    playerName:string
    action:"add"|"remove"
    slot:number
    itemId:string
    itemAmount:number
    dimensionId:DimensionId
}
type blockInteractedWith = {
    pos:BlockPos
    playerName:string
    blockName:string
    blockData:number
    dimensionId:DimensionId
}
type itemThrow = {
    loc:Vec3
    playerName:string
    itemName:string
    dimensionId:DimensionId
}
type blockPlace = {
    pos:BlockPos
    playerName:string
    blockName:string
    blockData:number
    dimensionId:DimensionId
}
type blockDestroy = {
    pos:BlockPos
    playerName:string
    blockName:string
    blockData:number
    dimensionId:DimensionId
}
type lightningHitBlock = {
    pos:BlockPos
    blockName:string
    blockData:number
    dimensionId:DimensionId
}
type getElytra = {
    loc:Vec3
    playerName:string
    dimensionId:DimensionId
}
type signBlockPlace = {
    pos:Vec3
    playerName:string
    id:string
    side:string
    text:string
    dimensionId:DimensionId
}
export {
    playerAttack,
    entityDie,
    blockContainer,
    blockInteractedWith,
    itemThrow,
    blockPlace,
    blockDestroy,
    lightningHitBlock,
    getElytra,
    signBlockPlace
}


export const queryText = {
    playerAttack:"playerattack(time,playerName,victimId,victimName,x,y,z,dimension)",
    entityDie:"entitydie(time,attackerId,attackerName,victimId,victimName,cause,x,y,z,dimension)",
    blockContainer:"blockcontainer(time,playerName,type,slot,action,itemId,amount,x,y,z,dimension)",
    blockInteractedWith:"blockinteractedwith(time,playerName,blockName,blockData,x,y,z,dimension)",
    itemThrow:"itemthrow(time,playerName,itemName,x,y,z,dimension)",
    blockPlace:"blockplace(time,playerName,blockName,blockData,x,y,z,dimension)",
    blockDestroy:"blockdestroy(time,playerName,blockName,blockData,x,y,z,dimension)",
    lightningHitBlock:"lightninghitBlock(time,blockName,blockData,x,y,z,dimension)",
    getElytra:"getelytra(time,playerName,x,y,z,dimension)",
    signBlockPlace:"signblockplace(time,playerName,id,side,text,x,y,z,dimension)"
}