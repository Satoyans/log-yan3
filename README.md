
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

| table               | column       | remarkes                  |
| :------------------ | :----------- | :------------------------ |
| blockContainer      | time         |                           |
|                     | playerName   |                           |
|                     | type         | not `minecraft:`          |
|                     | slot         |                           |
|                     | action       | `add` or `remove`         |
|                     | itemId       | `minecraft:`+itemName     |
|                     | amount       |                           |
|                     | x            |                           |
|                     | y            |                           |
|                     | z            |                           |
|                     | dimention    |                           |
|                     |              |                           |
| blockDestroy        | time         |                           |
|                     | playerName   |                           |
|                     | blockName    | `minecraft:`+blockId      |
|                     | blockData    |                           |
|                     | x            |                           |
|                     | y            |                           |
|                     | z            |                           |
|                     | dimension    |                           |
|                     |              |                           |
| blockInteractedWith | time         |                           |
|                     | playerName   |                           |
|                     | blockName    | not `minecraft:`          |
|                     | blockData    |                           |
|                     | x            |                           |
|                     | y            |                           |
|                     | z            |                           |
|                     | dimension    |                           |
|                     |              |                           |
| blockPlace          | time         |                           |
|                     | playerName   |                           |
|                     | blockName    | `minecraft:`+blockId      |
|                     | blockData    |                           |
|                     | x            |                           |
|                     | y            |                           |
|                     | z            |                           |
|                     | dimension    |                           |
|                     |              |                           |
| entityDie           | time         |                           |
|                     | attackerId   | `undefined` or entityType |
|                     | attackerName |                           |
|                     | victimId     |                           |
|                     | cause        |                           |
|                     | x            |                           |
|                     | y            |                           |
|                     | z            |                           |
|                     | dimension    |                           |
|                     |              |                           |
| getElytra           | time         |                           |
|                     | playerName   |                           |
|                     | x            |                           |
|                     | y            |                           |
|                     | z            |                           |
|                     | dimension    |                           |
|                     |              |                           |
| itemThrow           | time         |                           |
|                     | playerName   |                           |
|                     | itemName     | `minecraft:`+itemName     |
|                     | x            |                           |
|                     | y            |                           |
|                     | z            |                           |
|                     | dimension    |                           |
|                     |              |                           |
| lightningHitBlock   | time         |                           |
|                     | blockName    | `minecraft:`+blockId      |
|                     | blockData    |                           |
|                     | x            |                           |
|                     | y            |                           |
|                     | z            |                           |
|                     | dimension    |                           |
|                     |              |                           |
| playerAttack        | time         |                           |
|                     | playerName   |                           |
|                     | victimId     |                           |
|                     | victimName   |                           |
|                     | x            |                           |
|                     | y            |                           |
|                     | z            |                           |
|                     | dimension    |                           |
|                     |              |                           |
| signBlockPlace      | time         |                           |
|                     | playerName   |                           |
|                     | id           | `Sign`or`HangingSign`     |
|                     | side         | `FrontText`or`BackText`   |
|                     | text         |                           |
|                     | x            |                           |
|                     | y            |                           |
|                     | z            |                           |
|                     | dimension    |                           |

## めも

- .envを作成する。
  - SQL_PASSWORD
  - SQL_DATABASE
