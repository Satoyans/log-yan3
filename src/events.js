"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogyanMainClass = void 0;
//bds modules
const actor_1 = require("bdsx/bds/actor");
const inventory_1 = require("bdsx/bds/inventory");
const packetids_1 = require("bdsx/bds/packetids");
const player_1 = require("bdsx/bds/player");
const form_1 = require("bdsx/bds/form");
const command_2 = require("bdsx/bds/command");
const blockpos_1 = require("bdsx/bds/blockpos");
const block_1 = require("bdsx/bds/block");
const nbt_1 = require("bdsx/bds/nbt");
const player_2 = require("bdsx/bds/player");
//bdsx modules
const core_1 = require("bdsx/core");
const nativetype_1 = require("bdsx/nativetype");
const prochacker_1 = require("bdsx/prochacker");
const common_1 = require("bdsx/common");
const command_1 = require("bdsx/command");
const event_1 = require("bdsx/event");
const launcher_1 = require("bdsx/launcher");
const nativetype_2 = require("bdsx/nativetype");
//node_modules
const fs = require("fs");
const path = require("path");
const query_functions_1 = require("./query_functions");
const nt = require("./nameTo");
class events2emitDataClass {
    constructor() {
        this.deathEntities = new Map();
        this.containerData = new Map();
        this.logviewer = new Map();
        this.commandRegister();
        this.commandFunc();
        this.reloadConfig();
        event_1.events.playerAttack.on(ev => this.playerAttack(ev)); //playerAttack
        event_1.events.entityDie.on(ev => this.entityDie(ev)); //entityDie
        event_1.events.blockInteractedWith.on(ev => this.blockInteractedWith(ev)); //blockInteractedWith
        event_1.events.itemUse.on(ev => this.itemUse(ev)); //itemThrow
        event_1.events.projectileShoot.on(ev => this.projectileShoot(ev)); //itemThrow
        event_1.events.itemUseOnBlock.on(ev => this.itemUseOnBlock(ev)); //blockPlace
        event_1.events.playerInventoryChange.on(ev => this.getElytra(ev)); //getElytra
        event_1.events.lightningHitBlock.on(ev => this.lightningHitBlock(ev)); //lightningHitBlock
        event_1.events.blockPlace.on(ev => this.blockPlace(ev)); //blockPlace
        event_1.events.blockDestroy.on(ev => this.blockDestroy(ev)); //blockDestroy
        event_1.events.playerJoin.on(ev => this.playerJoin(ev)); //logviewer delete
        this.frameAttack();
        this.blockContainer(); //blockContainer
        event_1.events.packetSend(packetids_1.MinecraftPacketIds.ContainerOpen).on((pk, ni) => {
            if (inventory_1.ContainerType[pk.type] == undefined)
                return;
            this.containerData.set(ni, blockpos_1.BlockPos.create(pk.pos));
        });
        this.signBlockPlace(); //signBlockPlace
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
    }
    ;
    commandFunc() {
        event_1.events.command.on((cmd, origin) => {
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
        const itemFrameBlock$attack = prochacker_1.procHacker.hooking("?attack@ItemFrameBlock@@UEBA_NPEAVPlayer@@AEBVBlockPos@@@Z", nativetype_1.bool_t, { this: block_1.BlockActor }, player_2.Player, blockpos_1.BlockPos)(onChangeItenFrameBlockAttack);
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
        let pos = blockpos_1.BlockPos.create(ev.x, ev.y, ev.z);
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
            commandLogSearchClass.logSearch(this.logviewer.get(ev.player.getName()), ev.player.getName(), blockpos_1.Vec3.create(ev.blockPos), ev.player.getDimensionId());
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
            commandLogSearchClass.logSearch(this.logviewer.get(ev.player.getName()), ev.player.getName(), blockpos_1.Vec3.create(ev.blockPos), ev.player.getDimensionId());
            return common_1.CANCEL;
        }
        else {
            if (!this.loggerEvent["blockDestroy"])
                return;
            let pos = ev.blockPos;
            let block = ev.blockSource.getBlock(blockpos_1.BlockPos.create(pos.x, pos.y, pos.z));
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
        let block = ev.region.getBlock(blockpos_1.BlockPos.create(ev.blockPos.x, ev.blockPos.y - 1, ev.blockPos.z));
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
        let pos = blockpos_1.Vec3.create(x, y, z);
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
            setTimeout((blockactor_) => {
                const savedTag = blockactor_.save();
                let after = savedTag;
                if (before["BackText"]["Text"] !== after["BackText"]["Text"] ||
                    before["BackText"]["TextOwner"] !== after["BackText"]["TextOwner"]) { //裏面が編集された
                    let name = nt.xuToName.get(after["BackText"]["TextOwner"]);
                    let emitData = {
                        pos: blockpos_1.Vec3.create(savedTag.x.value, savedTag.y.value, savedTag.z.value),
                        playerName: Boolean(name === undefined) ? "undefined" : name,
                        id: after.id,
                        side: "BackText",
                        text: after["BackText"]["Text"],
                        dimensionId: Boolean(name === undefined) ? actor_1.DimensionId.Undefined : nt.nameToPlayer.get(name).getDimensionId()
                    };
                    query_functions_1.edq.signBlockPlace(emitData);
                }
                if (before["FrontText"]["Text"] !== after["FrontText"]["Text"] ||
                    before["FrontText"]["TextOwner"] !== after["FrontText"]["TextOwner"]) { //表面が編集された
                    let name = nt.xuToName.get(after["FrontText"]["TextOwner"]);
                    let emitData = {
                        pos: blockpos_1.Vec3.create(savedTag.x.value, savedTag.y.value, savedTag.z.value),
                        playerName: Boolean(name === undefined) ? "undefined" : name,
                        id: after.id,
                        side: "FrontText",
                        text: after["FrontText"]["Text"],
                        dimensionId: Boolean(name === undefined) ? actor_1.DimensionId.Undefined : nt.nameToPlayer.get(name).getDimensionId()
                    };
                    query_functions_1.edq.signBlockPlace(emitData);
                }
            }, 100, blockActor);
        }
        const signBlockActor$onUpdatePacket_ = prochacker_1.procHacker.hooking("?_onUpdatePacket@SignBlockActor@@MEAAXAEBVCompoundTag@@AEAVBlockSource@@@Z", nativetype_2.void_t, null, block_1.BlockActor, nbt_1.CompoundTag, block_1.BlockSource)(signBlockActor$onUpdatePacket);
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
            form.sendTo(nt.nameToNi.get(playerName));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGFBQWE7QUFDYiwwQ0FBMEU7QUFDMUUsa0RBQWtEO0FBQ2xELGtEQUFrRDtBQUNsRCw0Q0FBNEM7QUFDNUMsd0NBQXdDO0FBRXhDLDhDQUE4QztBQUM5QyxnREFBbUQ7QUFDbkQsMENBQXlEO0FBQ3pELHNDQUFvRTtBQUNwRSw0Q0FBeUM7QUFDekMsY0FBYztBQUNkLG9DQUFvQztBQUNwQyxnREFBZ0Q7QUFDaEQsZ0RBQWdEO0FBQ2hELHdDQUF3QztBQUN4QywwQ0FBMEM7QUFHMUMsc0NBQW9DO0FBQ3BDLDRDQUE4QztBQUM5QyxnREFBeUM7QUFDekMsY0FBYztBQUNkLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFJN0IsdURBQTZDO0FBQzdDLCtCQUErQjtBQUUvQixNQUFNLG9CQUFvQjtJQU90QjtRQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRTNCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLGNBQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUEsY0FBYztRQUNsRSxjQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBLFdBQVc7UUFDekQsY0FBTSxDQUFDLG1CQUFt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