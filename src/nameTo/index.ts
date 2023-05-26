import { events } from "bdsx/event";
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { Player } from "bdsx/bds/player";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";

export const nameToNi = new Map<string, NetworkIdentifier>();
export const niToName = new Map<NetworkIdentifier, string>();
export const nameToXu = new Map<string, string>();
export const nameToPlayer = new Map<string, Player>();
export const xuToName = new Map<string, string>();


events.playerLeft.on((ev) => {
    xuToName.delete(ev.player.getXuid());
    xuToName.delete(ev.player.getNameTag());
})

events.packetAfter(MinecraftPacketIds.Login).on((ptr, networkIdentifier, _packetId) => {
    const ip = networkIdentifier.getAddress();
    const connreq = ptr.connreq;
    if (connreq === null) return;
    const cert = connreq.cert;
    const xuid = cert.getXuid();
    const username = cert.getId();
    nameToNi.set(username, networkIdentifier);
    niToName.set(networkIdentifier, username);
    nameToXu.set(username, xuid);
});

events.playerJoin.on(ev=>{
    if (ev.isSimulated) return;
    var name = ev.player.getName();
    nameToPlayer.set(name,ev.player);
    xuToName.set(ev.player.getXuid(), ev.player.getNameTag());
    nameToPlayer.set(ev.player.getNameTag(), ev.player);
});
events.packetAfter(MinecraftPacketIds.Disconnect).on((_pkt,networkIdentifier,_pktId)=>{
    const name = niToName.get(networkIdentifier)!;
    const player = nameToPlayer.get(name)!;
    nameToNi.delete(name);
    niToName.delete(networkIdentifier);
    nameToXu.delete(name);
    nameToPlayer.delete(name);
    xuToName.delete(player.getXuid());
});