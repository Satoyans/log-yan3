
# log-yan

Logging plug-in for BDSX.

Stores actions in the server in SQL.

This plugin was created for my server and may not be updated in the future.

Confirmed operation with V1.20.0.01

---

BDSX用のロギングプラグイン。

サーバー内でのアクションをSQLに保存します。

このプラグインは自分のサーバー用に作成したため、今後更新されない可能性があります。

V1.20.0.01で動作確認済み

## 使用しているシンボル | Symbols used

- ?attack@ItemFrameBlock@@UEBA_NPEAVPlayer@@AEBVBlockPos@@@Z
- ?_onItemChanged@LevelContainerModel@@MEAAXHAEBVItemStack@@0@Z
- ?_onUpdatePacket@SignBlockActor@@MEAAXAEBVCompoundTag@@AEAVBlockSource@@@Z

## 記録できるイベント | Loggable Events

| table               | column       | dataType   | remarkes                  |
| :------------------ | :----------- | :--------- | :------------------------ |
| blockContainer      | time         | `DATETIME` |                           |
|                     | playerName   | `TEXT`     |                           |
|                     | type         | `TEXT`     | not include `minecraft:`  |
|                     | slot         | `INT`      |                           |
|                     | action       | `TEXT`     | `add` or `remove`         |
|                     | itemId       | `TEXT`     | `minecraft:`+itemName     |
|                     | amount       | `INT`      |                           |
|                     | x            | `FLOAT`    |                           |
|                     | y            | `FLOAT`    |                           |
|                     | z            | `FLOAT`    |                           |
|                     | dimention    | `TEXT`     |                           |
|                     |              |            |                           |
| blockDestroy        | time         | `DATETIME` |                           |
|                     | playerName   | `TEXT`     |                           |
|                     | blockName    | `TEXT`     | `minecraft:`+blockId      |
|                     | blockData    | `TEXT`     |                           |
|                     | x            | `FLOAT`    |                           |
|                     | y            | `FLOAT`    |                           |
|                     | z            | `FLOAT`    |                           |
|                     | dimension    | `TEXT`     |                           |
|                     |              |            |                           |
| blockInteractedWith | time         | `DATETIME` |                           |
|                     | playerName   | `TEXT`     |                           |
|                     | blockName    | `TEXT`     | not include `minecraft:`  |
|                     | blockData    | `TEXT`     |                           |
|                     | x            | `FLOAT`    |                           |
|                     | y            | `FLOAT`    |                           |
|                     | z            | `FLOAT`    |                           |
|                     | dimension    | `TEXT`     |                           |
|                     |              |            |                           |
| blockPlace          | time         | `DATETIME` |                           |
|                     | playerName   | `TEXT`     |                           |
|                     | blockName    | `TEXT`     | `minecraft:`+blockId      |
|                     | blockData    | `TEXT`     |                           |
|                     | x            | `FLOAT`    |                           |
|                     | y            | `FLOAT`    |                           |
|                     | z            | `FLOAT`    |                           |
|                     | dimension    | `TEXT`     |                           |
|                     |              |            |                           |
| entityDie           | time         | `DATETIME` |                           |
|                     | attackerId   | `TEXT`     | `undefined` or entityType |
|                     | attackerName | `TEXT`     |                           |
|                     | victimId     | `TEXT`     |                           |
|                     | cause        | `TEXT`     |                           |
|                     | x            | `FLOAT`    |                           |
|                     | y            | `FLOAT`    |                           |
|                     | z            | `FLOAT`    |                           |
|                     | dimension    | `TEXT`     |                           |
|                     |              |            |                           |
| getElytra           | time         | `DATETIME` |                           |
|                     | playerName   | `TEXT`     |                           |
|                     | x            | `FLOAT`    |                           |
|                     | y            | `FLOAT`    |                           |
|                     | z            | `FLOAT`    |                           |
|                     | dimension    | `TEXT`     |                           |
|                     |              |            |                           |
| itemThrow           | time         | `DATETIME` |                           |
|                     | playerName   | `TEXT`     |                           |
|                     | itemName     | `TEXT`     | `minecraft:`+itemName     |
|                     | x            | `FLOAT`    |                           |
|                     | y            | `FLOAT`    |                           |
|                     | z            | `FLOAT`    |                           |
|                     | dimension    | `TEXT`     |                           |
|                     |              |            |                           |
| lightningHitBlock   | time         | `DATETIME` |                           |
|                     | blockName    | `TEXT`     | `minecraft:`+blockId      |
|                     | blockData    | `TEXT`     |                           |
|                     | x            | `FLOAT`    |                           |
|                     | y            | `FLOAT`    |                           |
|                     | z            | `FLOAT`    |                           |
|                     | dimension    | `TEXT`     |                           |
|                     |              |            |                           |
| playerAttack        | time         | `DATETIME` |                           |
|                     | playerName   | `TEXT`     |                           |
|                     | victimId     | `TEXT`     |                           |
|                     | victimName   | `TEXT`     |                           |
|                     | x            | `FLOAT`    |                           |
|                     | y            | `FLOAT`    |                           |
|                     | z            | `FLOAT`    |                           |
|                     | dimension    | `TEXT`     |                           |
|                     |              |            |                           |
| signBlockPlace      | time         | `DATETIME` |                           |
|                     | playerName   | `TEXT`     |                           |
|                     | id           | `TEXT`     | `Sign`or`HangingSign`     |
|                     | side         | `TEXT`     | `FrontText`or`BackText`   |
|                     | text         | `TEXT`     |                           |
|                     | x            | `FLOAT`    |                           |
|                     | y            | `FLOAT`    |                           |
|                     | z            | `FLOAT`    |                           |
|                     | dimension    | `TEXT`     |                           |

## memo

- .envを作成する。
  - SQL_PORT
  - SQL_PASSWORD
  - SQL_DATABASE
