
import { ActorDamageCause, ActorType, DimensionId } from "bdsx/bds/actor"
import { BlockPos, Vec3 } from "bdsx/bds/blockpos"

type playerAttack = {
    loc:any
    playerName:any
    victimId:any
    victimName:any
    dimensionId:any
}
type entityDie = {
    loc:any
    //Cause of death not involving an entity e.g.) fire, fall, void.
    attackerId:any | undefined
    attackerName:any
    victimId:any
    victimName:any
    cause:any
    dimensionId:any
}
type blockContainer = {
    time:any,
    playerName:any,
    type:any,
    slot:any,
    action:any,
    itemId:any,
    amount:any,
    x:any,
    y:any,
    z:any,
    dimension:any,
    logtype:"blockContainer"
}
type blockInteractedWith = {
    time:any,
    playerName:any,
    blockName:any,
    blockData:any,
    x:any,
    y:any,
    z:any,
    dimension:any,
    logtype:"blockInteractedWith"
}
type itemThrow = {
    loc:any
    playerName:any
    itemName:any
    dimensionId:any
}
type blockPlace = {
    time:any,
    playerName:any,
    blockName:any,
    blockData:any,
    x:any,
    y:any,
    z:any,
    dimension:any,
    logtype:"blockPlace"
}
type blockDestroy = {
    time:any,
    playerName:any,
    blockName:any,
    blockData:any,
    x:any,
    y:any,
    z:any,
    dimension:any,
    logtype:"blockDestroy"
}
type lightningHitBlock = {
    pos:any
    blockName:any
    blockData:any
    dimensionId:any
}
type getElytra = {
    loc:any
    playerName:any
    dimensionId:any
}
type signBlockPlace = {
    time:any
    playerName:any
    id:any
    side:any
    text:any
    x:any
    y:any
    z:any
    dimension:any
    logtype: "signBlockPlace"
}
export {
    //playerAttack,
    //entityDie,
    blockContainer,
    blockInteractedWith,
    //itemThrow,
    blockPlace,
    blockDestroy,
    //lightningHitBlock,
    //getElytra,
    signBlockPlace
}