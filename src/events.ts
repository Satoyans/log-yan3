//bds modules
import { ActorDamageCause, ActorType, DimensionId } from "bdsx/bds/actor";
import * as inventory_1 from "bdsx/bds/inventory";
import * as packetids_1 from "bdsx/bds/packetids";
import * as player_1 from "bdsx/bds/player";
import * as networkidentifier_1 from "bdsx/bds/networkidentifier";
import * as command_2 from "bdsx/bds/command";
import { BlockPos, Vec3 } from "bdsx/bds/blockpos";
import { BlockActor, BlockSource } from "bdsx/bds/block";
import { CompoundTag, StringTag, ByteTag, NBT } from "bdsx/bds/nbt";
import { Player } from "bdsx/bds/player";
//bdsx modules
import * as core_1 from "bdsx/core";
import * as nativetype_1 from "bdsx/nativetype";
import * as prochacker_1 from "bdsx/prochacker";
import * as common_1 from "bdsx/common";
import * as command_1 from "bdsx/command";
import * as blockEvent_1 from "bdsx/event_impl/blockevent";
import * as entityEvent_1 from "bdsx/event_impl/entityevent";
import { events } from "bdsx/event";
import { bedrockServer } from "bdsx/launcher";
import { void_t } from "bdsx/nativetype";
//node_modules
import * as fs from "fs";
import * as path from "path";
//my modules
import { edt } from "./types";
import { edq } from "./query_functions";
import * as nt from "./nameTo";
import { commandLogSearchClass } from "./inMinecraftLogSearch";

class events2emitDataClass {
    loggerEvent: {
        [key:string]: Boolean
    }
    deathEntities: Map<string, [number, edt.playerAttack]>
    containerData: Map<networkidentifier_1.NetworkIdentifier, BlockPos>;
    logviewer: Map<string, ("blockcontainer" | "blockdestroy" | "blockplace" | "blockinteractedwith" | "signblockplace" | "all")>;
    constructor() {
        this.deathEntities = new Map();
        this.containerData = new Map();
        this.logviewer = new Map();

        this.commandRegister();
        this.commandFunc();
        this.reloadConfig();

        events.playerAttack.on(ev => this.playerAttack(ev));//playerAttack
        events.entityDie.on(ev => this.entityDie(ev));//entityDie
        events.blockInteractedWith.on(ev => this.blockInteractedWith(ev));//blockInteractedWith
        events.itemUse.on(ev => this.itemUse(ev));//itemThrow
        events.projectileShoot.on(ev => this.projectileShoot(ev));//itemThrow
        events.itemUseOnBlock.on(ev => this.itemUseOnBlock(ev));//blockPlace
        events.playerInventoryChange.on(ev => this.getElytra(ev));//getElytra
        events.lightningHitBlock.on(ev => this.lightningHitBlock(ev));//lightningHitBlock
        events.blockPlace.on(ev => this.blockPlace(ev));//blockPlace
        events.blockDestroy.on(ev => this.blockDestroy(ev));//blockDestroy
        events.playerJoin.on(ev => this.playerJoin(ev));//logviewer delete
        this.frameAttack();
        this.blockContainer();//blockContainer
        events.packetSend(packetids_1.MinecraftPacketIds.ContainerOpen).on((pk, ni) => {//blockContainer
            if (inventory_1.ContainerType[pk.type] == undefined) return;
            this.containerData.set(ni, BlockPos.create(pk.pos));
        });
        this.signBlockPlace();//signBlockPlace
        console.log("[logyan] log-yan has been started");
    }
    commandRegister() {
        command_1.command.register("log-yan", "log-yan setting command.", command_2.CommandPermissionLevel.Operator)
            .overload((params, origin, output) => {
            }, {
                select: command_1.command.enum("log-yan.select1", "logview"),
                toggle: [command_1.command.enum("log-yan.view_on", "on"), {
                    optional: false,
                    options: command_2.CommandParameterOption.EnumAutocompleteExpansion,
                }],
                mode: [command_1.command.enum("log-yan.mode", "blockcontainer", "blockdestroy", "blockinteractedwith", "blockplace", "signblockplace", "all"), { optional: false }],
            })
            .overload((params, origin, output) => {
            }, {
                select: command_1.command.enum("log-yan.select1", "logview"),
                toggle: [command_1.command.enum("log-yan.view_off", "off"), {
                    optional: false,
                    options: command_2.CommandParameterOption.EnumAutocompleteExpansion,
                }],
            })
            .overload((params, origin, output) => {
            }, {
                select: command_1.command.enum("log-yan.select2", "setting"),
                mode: [command_1.command.enum("log-yan.setting", "logging_start", "logging_stop", "reload"), {
                    optional: false,
                    options: command_2.CommandParameterOption.EnumAutocompleteExpansion,
                }]
            });
    };

    commandFunc() {
        events.command.on((cmd, origin) => {
            if (!cmd.startsWith("/log-yan")) return;
            let splitcmd = cmd.split(" ");
            if (splitcmd.length != 3 && splitcmd.length != 4) return;
            if (splitcmd[1] === "logview") {
                if (splitcmd[2] == "on") {
                    let logMode = splitcmd[3];
                    if (logMode === undefined) {
                        nt.nameToPlayer.get(origin)!.runCommand(`tellraw @s {"rawtext":[{"text":"§4構文エラー"}]}`);
                        return;
                    }
                    if (logMode !== "blockcontainer" && logMode !== "blockdestroy" && logMode !== "blockinteractedwith" && logMode !== "blockplace" && logMode !== "all") {
                        nt.nameToPlayer.get(origin)!.sendMessage("§4構文エラー");
                        return;
                    }
                    nt.nameToPlayer.get(origin)!.sendMessage("§2ログを表示を開始します。");
                    this.logviewer.set(origin, logMode);
                } else
                    if (splitcmd[2] == "off") {
                        nt.nameToPlayer.get(origin)!.sendMessage("§2ログを表示を終了しました。");
                        this.logviewer.delete(origin);
                    } else {
                        nt.nameToPlayer.get(origin)!.sendMessage("§4構文エラー");
                    };
            }
            if (splitcmd[1] == "setting") {
                if (splitcmd[2] == "on" || splitcmd[2] == "off") {
                    let config = JSON.parse(fs.readFileSync(path.join(__dirname, "config.json")).toString());
                    config["isRun"] = Boolean(splitcmd[2] == "on");
                    fs.writeFileSync(path.join(__dirname, "config.json"), JSON.stringify(config, null, 4));
                    this.reloadConfig();
                } else if (splitcmd[2] == "reload") {
                    this.reloadConfig();
                } else {
                    nt.nameToPlayer.get(origin)!.sendMessage("§4構文エラー");
                };
            }
        })
    }
    reloadConfig() {
        let config = JSON.parse(fs.readFileSync(path.join(__dirname, "config.json")).toString());
        let isRun = Boolean(config.isRun);
        if (isRun) {
            this.loggerEvent = config.loggerEvent;
        } else {
            Object.keys(config.loggerEvent).forEach((key) => { config.loggerEvent[key] = false });
            this.loggerEvent = config.loggerEvent;
        }
    };

    playerJoin(ev: entityEvent_1.PlayerJoinEvent) {
        this.logviewer.delete(ev.player.getName())

    };


    playerAttack(ev: entityEvent_1.PlayerAttackEvent) {
        if (!this.loggerEvent["playerAttack"]) return;
        let emitData: edt.playerAttack = {
            loc: ev.victim.getPosition(),
            playerName: ev.player.getNameTag(),
            victimName: ev.victim.getNameTag(),
            victimId: ActorType[ev.victim.getEntityTypeId()] as keyof typeof ActorType,
            dimensionId: ev.victim.getDimensionId()
        };
        this.deathEntities.set(ev.victim.getAddressBin(), [new Date().getTime(), emitData]);
        edq.playerAttack(emitData)
    };
    entityDie(ev: entityEvent_1.EntityDieEvent) {
        if (!this.loggerEvent["entityDie"]) return;
        if (ev.entity === undefined) return;
        let playerAttack_data = this.deathEntities.get(ev.entity.getAddressBin());

        let attacker = ev.damageSource.getDamagingEntity();
        if (playerAttack_data !== undefined && attacker !== null) {
            let playerAttackData = playerAttack_data[1];
            let time = playerAttack_data[0];
            this.deathEntities.delete(ev.entity.getAddressBin())
            if (ActorType[attacker.getEntityTypeId()] == "Player" && new Date().getTime() - time < 100) {
                //attacked by player
                let emitData: edt.entityDie = {
                    loc: playerAttackData.loc,
                    attackerName: playerAttackData.playerName,
                    attackerId: ActorType[ActorType.Player] as keyof typeof ActorType,
                    victimName: playerAttackData.victimName ? playerAttackData.victimName : "",
                    victimId: playerAttackData.victimId,
                    cause: ActorDamageCause[ev.damageSource.cause] as keyof typeof ActorDamageCause,
                    dimensionId: playerAttackData.dimensionId
                };
                edq.entityDie(emitData);
                return;
            } else {
                //?
                console.error("ERROR! entityDie - The return value of Attacker.getEntityTypeId() is not Player.")
            }
        }
        //another cause of death ex.)fire,fall,void
        let pos = ev.entity.getPosition();
        let attackerName = attacker?.getNameTag();
        let attackerId = attacker?.getEntityTypeId();
        let emitData: edt.entityDie = {
            loc: pos,
            attackerName: attackerName ? attackerName : "",
            attackerId: (typeof attackerId === "undefined") ? undefined : ActorType[attackerId] as keyof typeof ActorType,
            victimName: ev.entity.getNameTag() ? ev.entity.getNameTag() : "",
            victimId: ActorType[ev.entity.getEntityTypeId()] as keyof typeof ActorType,
            cause: ActorDamageCause[ev.damageSource.cause] as keyof typeof ActorDamageCause,
            dimensionId: ev.entity.getDimensionId()
        };
        edq.entityDie(emitData);
    };

    itemUse(ev: entityEvent_1.ItemUseEvent) {
        if (!this.loggerEvent["itemThrow"]) return;
        if (!ev.player) return;
        if (!["lingering_potion", "splash_potion", "experience_bottle", "snowball", "ender_pearl", "ender_eye"].includes(ev.itemStack.getName().replace("minecraft:", ""))) return;
        let emitData: edt.itemThrow = {
            playerName: ev.player.getName(),
            itemName: ev.itemStack.getName(),
            loc: ev.player.getPosition(),
            dimensionId: ev.player.getDimensionId()
        };
        edq.itemThrow(emitData);
    };
    projectileShoot(ev: entityEvent_1.ProjectileShootEvent) {
        if (!this.loggerEvent["itemThrow"]) return;
        if (!ev.shooter.isPlayer()) return;
        //The following items will emit the event twice
        if (["Snowball", "Enderpearl", "LingeringPotion", "ThrownPotion", "ExperiencePotion", "ThrownEgg"].includes(ActorType[ev.projectile.getEntityTypeId()])) return;
        if (ev.shooter.getMainhandSlot().getName() === undefined) {
            let emitData: edt.itemThrow = {
                playerName: ev.shooter.getNameTag(),
                itemName: ActorType[ev.projectile.getEntityTypeId()],
                loc: ev.shooter.getPosition(),
                dimensionId: ev.shooter.getDimensionId()
            };
            edq.itemThrow(emitData);
        } else {
            let emitData: edt.itemThrow = {
                playerName: ev.shooter.getNameTag(),
                itemName: ev.shooter.getMainhandSlot().getName(),
                loc: ev.shooter.getPosition(),
                dimensionId: ev.shooter.getDimensionId()
            };
            edq.itemThrow(emitData);
        }
    };

    blockInteractedWith(ev: blockEvent_1.BlockInteractedWithEvent) {
        if (!this.loggerEvent["blockInteractedWith"]) return;
        if (!ev.player) return;
        let blockData = ev.player.getDimension().getBlockSource().getBlock(ev.blockPos);
        let emitData: edt.blockInteractedWith = {
            playerName: ev.player.getName(),
            blockName: blockData.blockLegacy.getRenderBlock().getDescriptionId().replace("tile.", ""),
            blockData: blockData.data,
            pos: ev.blockPos,
            dimensionId: ev.player.getDimensionId()
        };
        edq.blockInteractedWith(emitData);
    };

    frameAttack() {
        const checkLoggerEvent = (): Boolean => { return this.loggerEvent["blockInteractedWith"] };
        const itemFrameBlock$attack = prochacker_1.procHacker.hooking("?attack@ItemFrameBlock@@UEBA_NPEAVPlayer@@AEBVBlockPos@@@Z",
            nativetype_1.bool_t, { this: BlockActor }, Player, BlockPos)(onChangeItenFrameBlockAttack);
        function onChangeItenFrameBlockAttack(this: BlockActor, player: Player, blockpos: BlockPos) {
            if (!checkLoggerEvent) return itemFrameBlock$attack.call(this, player, blockpos);
            let region = player.getRegion();
            let block = region.getBlock(blockpos);
            let emitData: edt.blockInteractedWith = {
                playerName: player.getName(),
                blockName: block.getName(),
                blockData: block.blockLegacy.getBlockItemId(),
                pos: blockpos,
                dimensionId: player.getDimensionId()
            };
            edq.blockInteractedWith(emitData);
            return itemFrameBlock$attack.call(this, player, blockpos);
        }
    };
    blockContainer() {
        const checkLoggerEvent = (): Boolean => { return this.loggerEvent["blockContainer"] };
        const levelContainerModel$onItemChanged = prochacker_1.procHacker.hooking('?_onItemChanged@LevelContainerModel@@MEAAXHAEBVItemStack@@0@Z',
            nativetype_1.void_t, null, core_1.StaticPointer, nativetype_1.int32_t, inventory_1.ItemStack, inventory_1.ItemStack)
            ((thiz, slot, oldItem, newItem) => {
                if (!checkLoggerEvent) return levelContainerModel$onItemChanged(thiz, slot, oldItem, newItem);
                const pl = player_1.ServerPlayer.ref()[nativetype_1.NativeType.getter](thiz, 208);
                if (!Boolean(pl.hasOpenContainer())) {
                    return
                    //console.error(`[log-yan]Error: no data on the opening of this container.(player:${pl.getNameTag()},vicinity:${pl.getPosition().x}/${pl.getPosition().y}/${pl.getPosition().z})`)
                };
                const blockpos = this.containerData.get(pl.getNetworkIdentifier());
                if (blockpos === undefined) return;
                const block = pl.getRegion().getBlock(blockpos);
                if (oldItem.amount === 0 && newItem.amount > 0) {//air => item
                    var emitData: edt.blockContainer = {
                        blockType: block.getName().replace("minecraft:", ""),
                        action: "add",
                        itemId: newItem.getName(),
                        itemAmount: newItem.amount,
                        slot: slot,
                        playerName: pl.getName(),
                        pos: blockpos,
                        dimensionId: pl.getDimensionId()
                    };
                    edq.blockContainer(emitData);
                } else if (oldItem.amount > 0 && newItem.amount === 0) {//item => air
                    var emitData: edt.blockContainer = {
                        blockType: block.getName().replace("minecraft:", ""),
                        action: "remove",
                        itemId: oldItem.getName(),
                        itemAmount: oldItem.amount,
                        slot: slot,
                        playerName: pl.getName(),
                        pos: blockpos,
                        dimensionId: pl.getDimensionId()
                    };
                    edq.blockContainer(emitData);
                } else if (oldItem.item.equalsptr(newItem.item)) {//Same item
                    if (oldItem.amount > newItem.amount) {//remove
                        var emitData: edt.blockContainer = {
                            blockType: block.getName().replace("minecraft:", ""),
                            action: "remove",
                            itemId: oldItem.getName(),
                            itemAmount: oldItem.amount - newItem.amount,
                            slot: slot,
                            playerName: pl.getName(),
                            pos: blockpos,
                            dimensionId: pl.getDimensionId()
                        };
                        edq.blockContainer(emitData);
                    } else {//add
                        var emitData: edt.blockContainer = {
                            blockType: block.getName().replace("minecraft:", ""),
                            action: "add",
                            itemId: newItem.getName(),
                            itemAmount: newItem.amount - oldItem.amount,
                            slot: slot,
                            playerName: pl.getName(),
                            pos: blockpos,
                            dimensionId: pl.getDimensionId()
                        };
                        edq.blockContainer(emitData);
                    }
                } else {// itemA => itemB
                    var emitData: edt.blockContainer = {
                        blockType: block.getName().replace("minecraft:", ""),
                        action: "remove",
                        itemId: oldItem.getName(),
                        itemAmount: oldItem.amount,
                        slot: slot,
                        playerName: pl.getName(),
                        pos: blockpos,
                        dimensionId: pl.getDimensionId()
                    };
                    edq.blockContainer(emitData);
                    var emitData: edt.blockContainer = {
                        blockType: block.getName().replace("minecraft:", ""),
                        action: "add",
                        itemId: newItem.getName(),
                        itemAmount: newItem.amount,
                        slot: slot,
                        playerName: pl.getName(),
                        pos: blockpos,
                        dimensionId: pl.getDimensionId()
                    };
                    edq.blockContainer(emitData);
                };


            });

    };
    itemUseOnBlock(ev: entityEvent_1.ItemUseOnBlockEvent) {
        if (!this.loggerEvent["itemUseOnBlock"]) return;
        if (!ev.actor.isPlayer()) return;
        let direction = ["down", "up", "north", "south", "west", "east"];
        //let bucket_ids = { "362": "water", "363": "lava", "368": "powder_snow", "259": "fire" }
        //if (!bucket_ids[ev.itemStack.getId().toString()]) return;
        let itemStackName = ev.itemStack.getItem()?.getCommandName()
        if (itemStackName?.match(/minecraft:.*bucket/) == null) return;
        let pos = BlockPos.create(ev.x, ev.y, ev.z);
        switch (direction[ev.face]) {
            case ("down"): pos.y -= 1; break;
            case ("up"): pos.y += 1; break;
            case ("north"): pos.z -= 1; break;
            case ("south"): pos.z += 1; break;
            case ("west"): pos.x -= 1; break;
            case ("east"): pos.x += 1; break;
        };
        let emitData: edt.blockPlace = {
            pos: pos,
            playerName: ev.actor.getNameTag(),
            blockName: itemStackName,
            blockData: 0,
            dimensionId: ev.actor.getDimensionId()
        };
        edq.blockPlace(emitData);
    };
    blockPlace(ev: blockEvent_1.BlockPlaceEvent) {
        if (!ev.player) return;
        if (this.logviewer.get(ev.player.getName())) {
            let pos = ev.blockPos;
            commandLogSearchClass.logSearch(this.logviewer.get(ev.player.getName())!, ev.player.getName(), Vec3.create(ev.blockPos), ev.player.getDimensionId());
            return common_1.CANCEL;
        } else {
            if (!this.loggerEvent["blockPlace"]) return;
            let pos = ev.blockPos;
            let emitData: edt.blockPlace = {
                pos: pos,
                playerName: ev.player.getName(),
                blockName: ev.block.getName(),
                blockData: ev.block.data,
                dimensionId: ev.player.getDimensionId()
            };
            edq.blockPlace(emitData);
        }
    };
    blockDestroy(ev: blockEvent_1.BlockDestroyEvent) {
        if (!ev.player) return;
        if (this.logviewer.get(ev.player.getName())) {
            let pos = ev.blockPos;
            commandLogSearchClass.logSearch(this.logviewer.get(ev.player.getName())!, ev.player.getName(), Vec3.create(ev.blockPos), ev.player.getDimensionId());
            return common_1.CANCEL;
        } else {
            if (!this.loggerEvent["blockDestroy"]) return;
            let pos = ev.blockPos;
            let block = ev.blockSource.getBlock(BlockPos.create(pos.x, pos.y, pos.z));
            let emitData: edt.blockDestroy = {
                pos: pos,
                playerName: ev.player.getName(),
                blockName: block.getName(),
                blockData: block.data,
                dimensionId: ev.player.getDimensionId()
            };
            edq.blockDestroy(emitData);
        }
    };
    lightningHitBlock(ev: blockEvent_1.LightningHitBlockEvent) {
        if (!this.loggerEvent["lightningHitBlock"]) return;
        let pos = ev.blockPos;
        let block = ev.region.getBlock(BlockPos.create(ev.blockPos.x, ev.blockPos.y - 1, ev.blockPos.z));
        let emitData: edt.lightningHitBlock = {
            blockName: block.getName(),
            blockData: block.data,
            pos: pos,
            dimensionId: ev.region.getDimensionId()
        };
        edq.lightningHitBlock(emitData);

    }
    getElytra(ev: entityEvent_1.PlayerInventoryChangeEvent) {
        if (!this.loggerEvent["getElytra"]) return;
        if (!ev.player.isPlayer()) return;
        if (ev.newItemStack.getName() !== "minecraft:elytra" ||
            ev.newItemStack.getCustomLore().length !== 0
        ) return;
        var player = ev.player;
        let playerPos = player.getFeetPos();
        let x = Math.ceil(playerPos.x);
        let y = Math.ceil(playerPos.y);
        let z = Math.ceil(playerPos.z);
        let pos = Vec3.create(x, y, z)
        ev.newItemStack.setCustomLore([`§0${x}.${y}.${z}§r`]);
        ev.newItemStack.startCoolDown(player);
        bedrockServer.serverInstance.nextTick().then(() => {
            bedrockServer.executeCommand(`give ${player.getName()} firework_rocket 5`)
            bedrockServer.executeCommand(`tellraw @a {"rawtext":[{"text":"§e${player.getName()}がエリトラを入手しました。§r"}]}`)
        })
        let emitData: edt.getElytra = {
            loc: pos,
            playerName: player.getName(),
            dimensionId: ev.player.getDimensionId()
        }
        edq.getElytra(emitData);
    }
    signBlockPlace() {
        const checkLoggerEvent = (): Boolean => { return this.loggerEvent["signBlockPlace"] };
        function signBlockActor$onUpdatePacket(blockActor: BlockActor, tag: CompoundTag, source: BlockSource) {
            log(blockActor);
            return signBlockActor$onUpdatePacket_(blockActor, tag, source);
        };
        function log(blockActor: BlockActor) {
            if (!checkLoggerEvent()) return;
            var before = blockActor.save();
            setTimeout((blockactor_) => {
                const savedTag = blockactor_.save();
                let after = savedTag;
                if (before["BackText"]["Text"] !== after["BackText"]["Text"] ||
                    before["BackText"]["TextOwner"] !== after["BackText"]["TextOwner"]) {//裏面が編集された
                    let name = nt.xuToName.get(after["BackText"]["TextOwner"]);
                    let emitData: edt.signBlockPlace = {
                        pos: Vec3.create((savedTag.x as NBT.Int).value, (savedTag.y as NBT.Int).value, (savedTag.z as NBT.Int).value),
                        playerName: Boolean(name === undefined) ? "undefined" : (name as string),
                        id: (after.id as string),
                        side: "BackText",
                        text: after["BackText"]["Text"],
                        dimensionId: Boolean(name === undefined) ? DimensionId.Undefined : (nt.nameToPlayer.get(name!) as Player).getDimensionId()
                    }
                    edq.signBlockPlace(emitData);
                }

                if (before["FrontText"]["Text"] !== after["FrontText"]["Text"] ||
                    before["FrontText"]["TextOwner"] !== after["FrontText"]["TextOwner"]) {//表面が編集された
                    let name = nt.xuToName.get(after["FrontText"]["TextOwner"]);
                    let emitData: edt.signBlockPlace = {
                        pos: Vec3.create((savedTag.x as NBT.Int).value, (savedTag.y as NBT.Int).value, (savedTag.z as NBT.Int).value),
                        playerName: Boolean(name === undefined) ? "undefined" : (name as string),
                        id: (after.id as string),
                        side: "FrontText",
                        text: after["FrontText"]["Text"],
                        dimensionId: Boolean(name === undefined) ? DimensionId.Undefined : (nt.nameToPlayer.get(name!) as Player).getDimensionId()
                    }
                    edq.signBlockPlace(emitData);
                }
            }, 100, blockActor);
        }
        const signBlockActor$onUpdatePacket_ = prochacker_1.procHacker.hooking("?_onUpdatePacket@SignBlockActor@@MEAAXAEBVCompoundTag@@AEAVBlockSource@@@Z", void_t, null, BlockActor, CompoundTag, BlockSource)(signBlockActor$onUpdatePacket);
    }
};

export { events2emitDataClass as LogyanMainClass }