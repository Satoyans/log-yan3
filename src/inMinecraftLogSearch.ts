import { sdq } from "./query_functions";
import { sdt } from "./types";
import * as nt from "./nameTo";
import * as form_1 from "bdsx/bds/form";
import { Vec3 } from "bdsx/bds/blockpos";
import { DimensionId } from "bdsx/bds/actor";

//minecraft内でのログ検索の関数をまとめたクラス
class commandLogSearchClass {
    /**
     * ゲーム内での座標によるログ検索
     * @param logMode 検索するモード
     * @param playerName 検索している人の名前
     * @param pos 検索している座標
     * @param dimensionId 検索しているディメンション
     */
    static async logSearch(logMode: ("blockcontainer" | "blockdestroy" | "blockplace" | "blockinteractedwith" | "signblockplace" | "all"), playerName: string, pos: Vec3, dimensionId: DimensionId) {
        var logs: (sdt.blockContainer | sdt.blockInteractedWith | sdt.blockDestroy | sdt.blockPlace | sdt.signBlockPlace)[] = [];
        if (logMode == "all") {
            Promise.all([
                sdq.blockPlace(pos, dimensionId),
                sdq.blockDestroy(pos, dimensionId),
                sdq.blockInteractedWith(pos, dimensionId),
                sdq.blockContainer(pos, dimensionId)
            ]).then((v) => {
                for (let x of v) {
                    logs = logs.concat(x);
                }
                let form = this.makeForm(logs, pos);
                form.sendTo(nt.nameToNi.get(playerName)!);
            })
        } else {
            switch (logMode) {
                case "blockplace":
                    logs = logs.concat(await sdq.blockPlace(pos, dimensionId));
                    break;
                case "blockdestroy":
                    logs = logs.concat(await sdq.blockDestroy(pos, dimensionId));
                    break;
                case "blockinteractedwith":
                    logs = logs.concat(await sdq.blockInteractedWith(pos, dimensionId));
                    break;
                case "blockcontainer":
                    logs = logs.concat(await sdq.blockContainer(pos, dimensionId));
                    break;
                case "signblockplace":
                    logs = logs.concat(await sdq.signBlockPlace(pos, dimensionId));
                    break;
            }
            let form = this.makeForm(logs, pos);
            form.sendTo(nt.nameToNi.get(playerName)!);
        }
    }
    /**
     * ログ検索の結果をフォームにして返す
     * @param logs
     * @param pos 
     * @returns 
     */
    private static makeForm(logs: (sdt.blockContainer | sdt.blockInteractedWith | sdt.blockDestroy | sdt.blockPlace | sdt.signBlockPlace)[], pos: Vec3) {
        var form = new form_1.SimpleForm();
        form.setTitle(`[Log-yan] ${pos.x}/${pos.y}/${pos.z}`);
        if (logs.length === 0) {
            form.setTitle(`[Log-yan] No Log Data!`)
        } else {
            for (let data of logs.sort((a, b) => { return new Date(a.time).getTime() - new Date(b.time).getTime() })) {
                var timedata = new Date(data.time)
                var time = `${this.zero(timedata.getMonth() + 1)}/${this.zero(timedata.getDate())}/${this.zero(timedata.getHours())}:${this.zero(timedata.getMinutes())}:${this.zero(timedata.getSeconds())}`
                var formText = `[${time}] ${data.logtype} §c${data.playerName}§r`;
                if ("blockName" in data) {
                    formText = `${formText} §5${data.blockName}§r(${data.blockData})`
                }
                if ("action" in data) {
                    formText = `${formText} §2${data.action}§r ${data.type}(${data.slot}) §5${data.itemId}§r:${data.amount}`
                }
                form.setContent(`${form.getContent()}\n${formText}`);
            }
        };
        return form;
    };
    static zero(num: number) {
        return ('0' + num).slice(-2);
    }

}

export { commandLogSearchClass };