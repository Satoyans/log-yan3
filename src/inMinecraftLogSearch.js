"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandLogSearchClass = void 0;
const query_functions_1 = require("./query_functions");
const nt = require("./nameTo");
const form_1 = require("bdsx/bds/form");
//minecraft内でのログ検索の関数をまとめたクラス
class commandLogSearchClass {
    /**
     * ゲーム内での座標によるログ検索
     * @param logMode 検索するモード
     * @param playerName 検索している人の名前
     * @param pos 検索している座標
     * @param dimensionId 検索しているディメンション
     */
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
    /**
     * ログ検索の結果をフォームにして返す
     * @param logs
     * @param pos
     * @returns
     */
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
exports.commandLogSearchClass = commandLogSearchClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5NaW5lY3JhZnRMb2dTZWFyY2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbk1pbmVjcmFmdExvZ1NlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1REFBd0M7QUFFeEMsK0JBQStCO0FBQy9CLHdDQUF3QztBQUl4Qyw2QkFBNkI7QUFDN0IsTUFBTSxxQkFBcUI7SUFDdkI7Ozs7OztPQU1HO0lBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBOEcsRUFBRSxVQUFrQixFQUFFLEdBQVMsRUFBRSxXQUF3QjtRQUMxTCxJQUFJLElBQUksR0FBOEcsRUFBRSxDQUFDO1FBQ3pILElBQUksT0FBTyxJQUFJLEtBQUssRUFBRTtZQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUNSLHFCQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUM7Z0JBQ2hDLHFCQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUM7Z0JBQ2xDLHFCQUFHLENBQUMsbUJBQW1CLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQztnQkFDekMscUJBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQzthQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1YsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ2IsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3pCO2dCQUNELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBRSxDQUFDLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUE7U0FDTDthQUFNO1lBQ0gsUUFBUSxPQUFPLEVBQUU7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