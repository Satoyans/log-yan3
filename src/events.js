"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogyanMainClass = void 0;
const actor_1 = require("bdsx/bds/actor");
const core_1 = require("bdsx/core");
const nativetype_1 = require("bdsx/nativetype");
const prochacker_1 = require("bdsx/prochacker");
const inventory_1 = require("bdsx/bds/inventory");
const packetids_1 = require("bdsx/bds/packetids");
const player_1 = require("bdsx/bds/player");
const form_1 = require("bdsx/bds/form");
const common_1 = require("bdsx/common");
const command_1 = require("bdsx/command");
const command_2 = require("bdsx/bds/command");
const event_2 = require("bdsx/event");
const blockpos_2 = require("bdsx/bds/blockpos");
const launcher_1 = require("bdsx/launcher");
const fs = require("fs");
const path = require("path");
const query_functions_1 = require("./query_functions");
const nt = require("./nameTo");
const block_2 = require("bdsx/bds/block");
const nbt_1 = require("bdsx/bds/nbt");
const player_2 = require("bdsx/bds/player");
const nativetype_2 = require("bdsx/nativetype");
const nameTo_1 = require("./nameTo");
class events2emitDataClass {
    constructor() {
        this.deathEntities = new Map();
        this.containerData = new Map();
        this.logviewer = new Map();
        this.loggerEvent;
        this.commandRegister();
        this.commandFunc();
        this.reloadConfig();
        event_2.events.playerAttack.on(ev => this.playerAttack(ev)); //playerAttack
        event_2.events.entityDie.on(ev => this.entityDie(ev)); //entityDie
        event_2.events.blockInteractedWith.on(ev => this.blockInteractedWith(ev)); //blockInteractedWith
        event_2.events.itemUse.on(ev => this.itemUse(ev)); //itemThrow
        event_2.events.projectileShoot.on(ev => this.projectileShoot(ev)); //itemThrow
        event_2.events.itemUseOnBlock.on(ev => this.itemUseOnBlock(ev)); //blockPlace
        event_2.events.playerInventoryChange.on(ev => this.getElytra(ev)); //getElytra
        event_2.events.lightningHitBlock.on(ev => this.lightningHitBlock(ev)); //lightningHitBlock
        event_2.events.blockPlace.on(ev => this.blockPlace(ev)); //blockPlace
        event_2.events.blockDestroy.on(ev => this.blockDestroy(ev)); //blockDestroy
        event_2.events.playerJoin.on(ev => this.playerJoin(ev)); //logviewer delete
        this.blockContainer(); //blockContainer
        this.frameAttack();
        event_2.events.packetSend(packetids_1.MinecraftPacketIds.ContainerOpen).on((pk, ni) => {
            if (inventory_1.ContainerType[pk.type] == undefined)
                return;
            this.containerData.set(ni, blockpos_2.BlockPos.create(pk.pos));
        });
        this.signBlockPlace(); //signBlockPlace
        console.log("[logyan]".yellow, "log-yan has been started".blue);
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
    }
    ;
    commandFunc() {
        event_2.events.command.on((cmd, origin) => {
            if (!cmd.startsWith("/log-yan"))
                return;
            let splitcmd = cmd.split(" ");
            if (splitcmd.length != 3 && splitcmd.length != 4)
                return;
            if (splitcmd[1] === "logview") {
                if (splitcmd[2] == "on") {
                    let logMode = splitcmd[3];
                    if (logMode === undefined) {
                        nt.nameToPlayer.get(origin).runCommand(`tellraw @s {"rawtext":[{"text":"§4構文エラー"}]}`);
                        return;
                    }
                    if (logMode !== "blockcontainer" && logMode !== "blockdestroy" && logMode !== "blockinteractedwith" && logMode !== "blockplace" && logMode !== "all") {
                        nt.nameToPlayer.get(origin).sendMessage("§4構文エラー");
                        return;
                    }
                    nt.nameToPlayer.get(origin).sendMessage("§2ログを表示を開始します。");
                    this.logviewer.set(origin, logMode);
                }
                else if (splitcmd[2] == "off") {
                    nt.nameToPlayer.get(origin).sendMessage("§2ログを表示を終了しました。");
                    this.logviewer.delete(origin);
                }
                else {
                    nt.nameToPlayer.get(origin).sendMessage("§4構文エラー");
                }
                ;
            }
            if (splitcmd[1] == "setting") {
                if (splitcmd[2] == "on" || splitcmd[2] == "off") {
                    let config = JSON.parse(fs.readFileSync(path.join(__dirname, "config.json")).toString());
                    config["isRun"] = Boolean(splitcmd[2] == "on");
                    fs.writeFileSync(path.join(__dirname, "config.json"), JSON.stringify(config, null, 4));
                    this.reloadConfig();
                }
                else if (splitcmd[2] == "reload") {
                    this.reloadConfig();
                }
                else {
                    nt.nameToPlayer.get(origin).sendMessage("§4構文エラー");
                }
                ;
            }
        });
    }
    reloadConfig() {
        let config = JSON.parse(fs.readFileSync(path.join(__dirname, "config.json")).toString());
        let isRun = Boolean(config.isRun);
        if (isRun) {
            this.loggerEvent = config.loggerEvent;
        }
        else {
            Object.keys(config.loggerEvent).forEach((key) => { config.loggerEvent[key] = false; });
            this.loggerEvent = config.loggerEvent;
        }
    }
    ;
    playerJoin(ev) {
        this.logviewer.delete(ev.player.getName());
    }
    ;
    playerAttack(ev) {
        if (!this.loggerEvent["playerAttack"])
            return;
        let emitData = {
            loc: ev.victim.getPosition(),
            playerName: ev.player.getNameTag(),
            victimName: ev.victim.getNameTag(),
            victimId: actor_1.ActorType[ev.victim.getEntityTypeId()],
            dimensionId: ev.victim.getDimensionId()
        };
        this.deathEntities.set(ev.victim.getAddressBin(), [new Date().getTime(), emitData]);
        query_functions_1.edq.playerAttack(emitData);
    }
    ;
    entityDie(ev) {
        if (!this.loggerEvent["entityDie"])
            return;
        if (ev.entity === undefined)
            return;
        let playerAttack_data = this.deathEntities.get(ev.entity.getAddressBin());
        let attacker = ev.damageSource.getDamagingEntity();
        if (playerAttack_data !== undefined && attacker !== null) {
            let playerAttackData = playerAttack_data[1];
            let time = playerAttack_data[0];
            this.deathEntities.delete(ev.entity.getAddressBin());
            if (actor_1.ActorType[attacker.getEntityTypeId()] == "Player" && new Date().getTime() - time < 100) {
                //attacked by player
                let emitData = {
                    loc: playerAttackData.loc,
                    attackerName: playerAttackData.playerName,
                    attackerId: actor_1.ActorType[actor_1.ActorType.Player],
                    victimName: playerAttackData.victimName ? playerAttackData.victimName : "",
                    victimId: playerAttackData.victimId,
                    cause: actor_1.ActorDamageCause[ev.damageSource.cause],
                    dimensionId: playerAttackData.dimensionId
                };
                query_functions_1.edq.entityDie(emitData);
                return;
            }
            else {
                //?
                console.error("ERROR! entityDie - The return value of Attacker.getEntityTypeId() is not Player.");
            }
        }
        //another cause of death ex.)fire,fall,void
        let pos = ev.entity.getPosition();
        let attackerName = attacker === null || attacker === void 0 ? void 0 : attacker.getNameTag();
        let attackerId = attacker === null || attacker === void 0 ? void 0 : attacker.getEntityTypeId();
        let emitData = {
            loc: pos,
            attackerName: attackerName ? attackerName : "",
            attackerId: (typeof attackerId === "undefined") ? undefined : actor_1.ActorType[attackerId],
            victimName: ev.entity.getNameTag() ? ev.entity.getNameTag() : "",
            victimId: actor_1.ActorType[ev.entity.getEntityTypeId()],
            cause: actor_1.ActorDamageCause[ev.damageSource.cause],
            dimensionId: ev.entity.getDimensionId()
        };
        query_functions_1.edq.entityDie(emitData);
    }
    ;
    itemUse(ev) {
        if (!this.loggerEvent["itemThrow"])
            return;
        if (!ev.player)
            return;
        if (!["lingering_potion", "splash_potion", "experience_bottle", "snowball", "ender_pearl", "ender_eye"].includes(ev.itemStack.getName().replace("minecraft:", "")))
            return;
        let emitData = {
            playerName: ev.player.getName(),
            itemName: ev.itemStack.getName(),
            loc: ev.player.getPosition(),
            dimensionId: ev.player.getDimensionId()
        };
        query_functions_1.edq.itemThrow(emitData);
    }
    ;
    projectileShoot(ev) {
        if (!this.loggerEvent["itemThrow"])
            return;
        if (!ev.shooter.isPlayer())
            return;
        //The following items will emit the event twice
        if (["Snowball", "Enderpearl", "LingeringPotion", "ThrownPotion", "ExperiencePotion", "ThrownEgg"].includes(actor_1.ActorType[ev.projectile.getEntityTypeId()]))
            return;
        if (ev.shooter.getMainhandSlot().getName() === undefined) {
            let emitData = {
                playerName: ev.shooter.getNameTag(),
                itemName: actor_1.ActorType[ev.projectile.getEntityTypeId()],
                loc: ev.shooter.getPosition(),
                dimensionId: ev.shooter.getDimensionId()
            };
            query_functions_1.edq.itemThrow(emitData);
        }
        else {
            let emitData = {
                playerName: ev.shooter.getNameTag(),
                itemName: ev.shooter.getMainhandSlot().getName(),
                loc: ev.shooter.getPosition(),
                dimensionId: ev.shooter.getDimensionId()
            };
            query_functions_1.edq.itemThrow(emitData);
        }
    }
    ;
    blockInteractedWith(ev) {
        if (!this.loggerEvent["blockInteractedWith"])
            return;
        if (!ev.player)
            return;
        let blockData = ev.player.getDimension().getBlockSource().getBlock(ev.blockPos);
        let emitData = {
            playerName: ev.player.getName(),
            blockName: blockData.blockLegacy.getRenderBlock().getDescriptionId().replace("tile.", ""),
            blockData: blockData.data,
            pos: ev.blockPos,
            dimensionId: ev.player.getDimensionId()
        };
        query_functions_1.edq.blockInteractedWith(emitData);
    }
    ;
    frameAttack() {
        const checkLoggerEvent = () => { return this.loggerEvent["blockInteractedWith"]; };
        const itemFrameBlock$attack = prochacker_1.procHacker.hooking("?attack@ItemFrameBlock@@UEBA_NPEAVPlayer@@AEBVBlockPos@@@Z", nativetype_1.bool_t, { this: block_2.BlockActor }, player_2.Player, blockpos_2.BlockPos)(onChangeItenFrameBlockAttack);
        function onChangeItenFrameBlockAttack(player, blockpos) {
            if (!checkLoggerEvent)
                return itemFrameBlock$attack.call(this, player, blockpos);
            let region = player.getRegion();
            let block = region.getBlock(blockpos);
            let emitData = {
                playerName: player.getName(),
                blockName: block.getName(),
                blockData: block.blockLegacy.getBlockItemId(),
                pos: blockpos,
                dimensionId: player.getDimensionId()
            };
            query_functions_1.edq.blockInteractedWith(emitData);
            return itemFrameBlock$attack.call(this, player, blockpos);
        }
    }
    ;
    blockContainer() {
        const checkLoggerEvent = () => { return this.loggerEvent["blockContainer"]; };
        const levelContainerModel$onItemChanged = prochacker_1.procHacker.hooking('?_onItemChanged@LevelContainerModel@@MEAAXHAEBVItemStack@@0@Z', nativetype_1.void_t, null, core_1.StaticPointer, nativetype_1.int32_t, inventory_1.ItemStack, inventory_1.ItemStack)((thiz, slot, oldItem, newItem) => {
            if (!checkLoggerEvent)
                return levelContainerModel$onItemChanged(thiz, slot, oldItem, newItem);
            const pl = player_1.ServerPlayer.ref()[nativetype_1.NativeType.getter](thiz, 208);
            if (!Boolean(pl.hasOpenContainer())) {
                return;
                //console.error(`[log-yan]Error: no data on the opening of this container.(player:${pl.getNameTag()},vicinity:${pl.getPosition().x}/${pl.getPosition().y}/${pl.getPosition().z})`)
            }
            ;
            const blockpos = this.containerData.get(pl.getNetworkIdentifier());
            if (blockpos === undefined)
                return;
            const block = pl.getRegion().getBlock(blockpos);
            if (oldItem.amount === 0 && newItem.amount > 0) { //air => item
                var emitData = {
                    blockType: block.getName().replace("minecraft:", ""),
                    action: "add",
                    itemId: newItem.getName(),
                    itemAmount: newItem.amount,
                    slot: slot,
                    playerName: pl.getName(),
                    pos: blockpos,
                    dimensionId: pl.getDimensionId()
                };
                query_functions_1.edq.blockContainer(emitData);
            }
            else if (oldItem.amount > 0 && newItem.amount === 0) { //item => air
                var emitData = {
                    blockType: block.getName().replace("minecraft:", ""),
                    action: "remove",
                    itemId: oldItem.getName(),
                    itemAmount: oldItem.amount,
                    slot: slot,
                    playerName: pl.getName(),
                    pos: blockpos,
                    dimensionId: pl.getDimensionId()
                };
                query_functions_1.edq.blockContainer(emitData);
            }
            else if (oldItem.item.equalsptr(newItem.item)) { //Same item
                if (oldItem.amount > newItem.amount) { //remove
                    var emitData = {
                        blockType: block.getName().replace("minecraft:", ""),
                        action: "remove",
                        itemId: oldItem.getName(),
                        itemAmount: oldItem.amount - newItem.amount,
                        slot: slot,
                        playerName: pl.getName(),
                        pos: blockpos,
                        dimensionId: pl.getDimensionId()
                    };
                    query_functions_1.edq.blockContainer(emitData);
                }
                else { //add
                    var emitData = {
                        blockType: block.getName().replace("minecraft:", ""),
                        action: "add",
                        itemId: newItem.getName(),
                        itemAmount: newItem.amount - oldItem.amount,
                        slot: slot,
                        playerName: pl.getName(),
                        pos: blockpos,
                        dimensionId: pl.getDimensionId()
                    };
                    query_functions_1.edq.blockContainer(emitData);
                }
            }
            else { // itemA => itemB
                var emitData = {
                    blockType: block.getName().replace("minecraft:", ""),
                    action: "remove",
                    itemId: oldItem.getName(),
                    itemAmount: oldItem.amount,
                    slot: slot,
                    playerName: pl.getName(),
                    pos: blockpos,
                    dimensionId: pl.getDimensionId()
                };
                query_functions_1.edq.blockContainer(emitData);
                var emitData = {
                    blockType: block.getName().replace("minecraft:", ""),
                    action: "add",
                    itemId: newItem.getName(),
                    itemAmount: newItem.amount,
                    slot: slot,
                    playerName: pl.getName(),
                    pos: blockpos,
                    dimensionId: pl.getDimensionId()
                };
                query_functions_1.edq.blockContainer(emitData);
            }
            ;
        });
    }
    ;
    itemUseOnBlock(ev) {
        var _a;
        if (!this.loggerEvent["itemUseOnBlock"])
            return;
        if (!ev.actor.isPlayer())
            return;
        let direction = ["down", "up", "north", "south", "west", "east"];
        //let bucket_ids = { "362": "water", "363": "lava", "368": "powder_snow", "259": "fire" }
        //if (!bucket_ids[ev.itemStack.getId().toString()]) return;
        let itemStackName = (_a = ev.itemStack.getItem()) === null || _a === void 0 ? void 0 : _a.getCommandName();
        if ((itemStackName === null || itemStackName === void 0 ? void 0 : itemStackName.match(/minecraft:.*bucket/)) == null)
            return;
        let pos = blockpos_2.BlockPos.create(ev.x, ev.y, ev.z);
        switch (direction[ev.face]) {
            case ("down"):
                pos.y -= 1;
                break;
            case ("up"):
                pos.y += 1;
                break;
            case ("north"):
                pos.z -= 1;
                break;
            case ("south"):
                pos.z += 1;
                break;
            case ("west"):
                pos.x -= 1;
                break;
            case ("east"):
                pos.x += 1;
                break;
        }
        ;
        let emitData = {
            pos: pos,
            playerName: ev.actor.getNameTag(),
            blockName: itemStackName,
            blockData: 0,
            dimensionId: ev.actor.getDimensionId()
        };
        query_functions_1.edq.blockPlace(emitData);
    }
    ;
    blockPlace(ev) {
        if (!ev.player)
            return;
        if (this.logviewer.get(ev.player.getName())) {
            let pos = ev.blockPos;
            commandLogSearchClass.logSearch(this.logviewer.get(ev.player.getName()), ev.player.getName(), blockpos_2.Vec3.create(ev.blockPos), ev.player.getDimensionId());
            return common_1.CANCEL;
        }
        else {
            if (!this.loggerEvent["blockPlace"])
                return;
            let pos = ev.blockPos;
            let emitData = {
                pos: pos,
                playerName: ev.player.getName(),
                blockName: ev.block.getName(),
                blockData: ev.block.data,
                dimensionId: ev.player.getDimensionId()
            };
            query_functions_1.edq.blockPlace(emitData);
        }
    }
    ;
    blockDestroy(ev) {
        if (!ev.player)
            return;
        if (this.logviewer.get(ev.player.getName())) {
            let pos = ev.blockPos;
            commandLogSearchClass.logSearch(this.logviewer.get(ev.player.getName()), ev.player.getName(), blockpos_2.Vec3.create(ev.blockPos), ev.player.getDimensionId());
            return common_1.CANCEL;
        }
        else {
            if (!this.loggerEvent["blockDestroy"])
                return;
            let pos = ev.blockPos;
            let block = ev.blockSource.getBlock(blockpos_2.BlockPos.create(pos.x, pos.y, pos.z));
            let emitData = {
                pos: pos,
                playerName: ev.player.getName(),
                blockName: block.getName(),
                blockData: block.data,
                dimensionId: ev.player.getDimensionId()
            };
            query_functions_1.edq.blockDestroy(emitData);
        }
    }
    ;
    lightningHitBlock(ev) {
        if (!this.loggerEvent["lightningHitBlock"])
            return;
        let pos = ev.blockPos;
        let block = ev.region.getBlock(blockpos_2.BlockPos.create(ev.blockPos.x, ev.blockPos.y - 1, ev.blockPos.z));
        let emitData = {
            blockName: block.getName(),
            blockData: block.data,
            pos: pos,
            dimensionId: ev.region.getDimensionId()
        };
        query_functions_1.edq.lightningHitBlock(emitData);
    }
    getElytra(ev) {
        if (!this.loggerEvent["getElytra"])
            return;
        if (!ev.player.isPlayer())
            return;
        if (ev.newItemStack.getName() !== "minecraft:elytra" ||
            ev.newItemStack.getCustomLore().length !== 0)
            return;
        var player = ev.player;
        let playerPos = player.getFeetPos();
        let x = Math.ceil(playerPos.x);
        let y = Math.ceil(playerPos.y);
        let z = Math.ceil(playerPos.z);
        let pos = blockpos_2.Vec3.create(x, y, z);
        ev.newItemStack.setCustomLore([`§0${x}.${y}.${z}§r`]);
        ev.newItemStack.startCoolDown(player);
        launcher_1.bedrockServer.serverInstance.nextTick().then(() => {
            launcher_1.bedrockServer.executeCommand(`give ${player.getName()} firework_rocket 5`);
            launcher_1.bedrockServer.executeCommand(`tellraw @a {"rawtext":[{"text":"§e${player.getName()}がエリトラを入手しました。§r"}]}`);
        });
        let emitData = {
            loc: pos,
            playerName: player.getName(),
            dimensionId: ev.player.getDimensionId()
        };
        query_functions_1.edq.getElytra(emitData);
    }
    signBlockPlace() {
        const checkLoggerEvent = () => { return this.loggerEvent["signBlockPlace"]; };
        function signBlockActor$onUpdatePacket(blockActor, tag, source) {
            log(blockActor);
            return signBlockActor$onUpdatePacket_(blockActor, tag, source);
        }
        ;
        function log(blockActor) {
            if (!checkLoggerEvent())
                return;
            var before = blockActor.save();
            var after;
            setTimeout((blockactor_) => {
                const savedTag = blockactor_.save();
                after = savedTag;
                if (before["BackText"]["Text"] !== after["BackText"]["Text"] ||
                    before["BackText"]["TextOwner"] !== after["BackText"]["TextOwner"]) { //裏面が編集された
                    let name = nameTo_1.xuToName.get(after["BackText"]["TextOwner"]);
                    let emitData = {
                        pos: blockpos_2.Vec3.create(savedTag.x.value, savedTag.y.value, savedTag.z.value),
                        playerName: Boolean(name === undefined) ? "undefined" : name,
                        id: after.id,
                        side: "BackText",
                        text: after["BackText"]["Text"],
                        dimensionId: Boolean(name === undefined) ? actor_1.DimensionId.Undefined : nameTo_1.nameToPlayer.get(name).getDimensionId()
                    };
                    query_functions_1.edq.signBlockPlace(emitData);
                }
                if (before["FrontText"]["Text"] !== after["FrontText"]["Text"] ||
                    before["FrontText"]["TextOwner"] !== after["FrontText"]["TextOwner"]) { //表面が編集された
                    let name = nameTo_1.xuToName.get(after["FrontText"]["TextOwner"]);
                    let emitData = {
                        pos: blockpos_2.Vec3.create(savedTag.x.value, savedTag.y.value, savedTag.z.value),
                        playerName: Boolean(name === undefined) ? "undefined" : name,
                        id: after.id,
                        side: "FrontText",
                        text: after["FrontText"]["Text"],
                        dimensionId: Boolean(name === undefined) ? actor_1.DimensionId.Undefined : nameTo_1.nameToPlayer.get(name).getDimensionId()
                    };
                    query_functions_1.edq.signBlockPlace(emitData);
                }
            }, 100, blockActor);
        }
        const signBlockActor$onUpdatePacket_ = prochacker_1.procHacker.hooking("?_onUpdatePacket@SignBlockActor@@MEAAXAEBVCompoundTag@@AEAVBlockSource@@@Z", nativetype_2.void_t, null, block_2.BlockActor, nbt_1.CompoundTag, block_2.BlockSource)(signBlockActor$onUpdatePacket);
    }
}
exports.LogyanMainClass = events2emitDataClass;
;
class commandLogSearchClass {
    static async logSearch(logMode, playerName, pos, dimensionId) {
        var logs = [];
        if (logMode == "all") {
            Promise.all([
                query_functions_1.sdq.blockPlace(pos, dimensionId),
                query_functions_1.sdq.blockDestroy(pos, dimensionId),
                query_functions_1.sdq.blockInteractedWith(pos, dimensionId),
                query_functions_1.sdq.blockContainer(pos, dimensionId)
            ]).then((v) => {
                for (let x of v) {
                    logs = logs.concat(x);
                }
                let form = this.makeForm(logs, pos);
                form.sendTo(nt.nameToNi.get(playerName));
            });
        }
        else {
            switch (logMode) {
                case "blockplace":
                    logs = logs.concat(await query_functions_1.sdq.blockPlace(pos, dimensionId));
                    break;
                case "blockdestroy":
                    logs = logs.concat(await query_functions_1.sdq.blockDestroy(pos, dimensionId));
                    break;
                case "blockinteractedwith":
                    logs = logs.concat(await query_functions_1.sdq.blockInteractedWith(pos, dimensionId));
                    break;
                case "blockcontainer":
                    logs = logs.concat(await query_functions_1.sdq.blockContainer(pos, dimensionId));
                    break;
                case "signblockplace":
                    logs = logs.concat(await query_functions_1.sdq.signBlockPlace(pos, dimensionId));
                    break;
            }
            let form = this.makeForm(logs, pos);
            form.sendTo(nameTo_1.nameToNi.get(playerName));
        }
    }
    static makeForm(logs, pos) {
        var form = new form_1.SimpleForm();
        form.setTitle(`[Log-yan] ${pos.x}/${pos.y}/${pos.z}`);
        if (logs.length === 0) {
            form.setTitle(`[Log-yan] No Log Data!`);
        }
        else {
            for (let data of logs.sort((a, b) => { return new Date(a.time).getTime() - new Date(b.time).getTime(); })) {
                var timedata = new Date(data.time);
                var time = `${this.zero(timedata.getMonth() + 1)}/${this.zero(timedata.getDate())}/${this.zero(timedata.getHours())}:${this.zero(timedata.getMinutes())}:${this.zero(timedata.getSeconds())}`;
                var formText = `[${time}] ${data.logtype} §c${data.playerName}§r`;
                if ("blockName" in data) {
                    formText = `${formText} §5${data.blockName}§r(${data.blockData})`;
                }
                if ("action" in data) {
                    formText = `${formText} §2${data.action}§r ${data.type}(${data.slot}) §5${data.itemId}§r:${data.amount}`;
                }
                form.setContent(`${form.getContent()}\n${formText}`);
            }
        }
        ;
        return form;
    }
    ;
    static zero(num) {
        return ('0' + num).slice(-2);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBDQUEwRTtBQUMxRSxvQ0FBb0M7QUFDcEMsZ0RBQWdEO0FBQ2hELGdEQUFnRDtBQUNoRCxrREFBa0Q7QUFDbEQsa0RBQWtEO0FBQ2xELDRDQUE0QztBQUM1Qyx3Q0FBd0M7QUFDeEMsd0NBQXdDO0FBRXhDLDBDQUEwQztBQUMxQyw4Q0FBOEM7QUFHOUMsc0NBQW9DO0FBQ3BDLGdEQUFtRDtBQUVuRCw0Q0FBOEM7QUFFOUMseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUk3Qix1REFBNkM7QUFDN0MsK0JBQStCO0FBRS9CLDBDQUF5RDtBQUN6RCxzQ0FBb0U7QUFDcEUsNENBQXlDO0FBRXpDLGdEQUF5QztBQUV6QyxxQ0FBNEQ7QUFDNUQsTUFBTSxvQkFBb0I7SUFpQnRCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsQ0FBQTtRQUVoQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixjQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBLGNBQWM7UUFDbEUsY0FBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxXQUFXO1FBQ3pELGNBQU0s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