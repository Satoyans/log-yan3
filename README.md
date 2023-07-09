
# log-yan

Logging plug-in for BDSX.

Stores actions in the server in SQL.

This plugin was created for my server and may not be maintained in the future.

---

BDSX用のロギングプラグイン。

サーバー内でのアクションをSQLに保存します。

このプラグインは自分のサーバー用に作成したため、今後メンテナンスがされない可能性があります。

## 使用しているシンボル | Symbols used

- ?attack@ItemFrameBlock@@UEBA_NPEAVPlayer@@AEBVBlockPos@@@Z
- ?_onItemChanged@LevelContainerModel@@MEAAXHAEBVItemStack@@0@Z
- ?_onUpdatePacket@SignBlockActor@@MEAAXAEBVCompoundTag@@AEAVBlockSource@@@Z

## 記録できるイベント | Loggable Events

| table               | column       | remarkes |
| :------------------ | :----------- | :------- |
| blockContainer      | time         |          |
|                     | playerName   |          |
|                     | type         |          |
|                     | slot         |          |
|                     | action       |          |
|                     | itemId       |          |
|                     | amount       |          |
|                     | x            |          |
|                     | y            |          |
|                     | z            |          |
|                     | dimention    |          |
|                     |              |          |
| blockDestroy        | time         |          |
|                     | playerName   |          |
|                     | blockName    |          |
|                     | blockData    |          |
|                     | x            |          |
|                     | y            |          |
|                     | z            |          |
|                     | dimension    |          |
|                     |              |          |
| blockInteractedWith | time         |          |
|                     | playerName   |          |
|                     | blockName    |          |
|                     | blockData    |          |
|                     | x            |          |
|                     | y            |          |
|                     | z            |          |
|                     | dimension    |          |
|                     |              |          |
| blockPlace          | time         |          |
|                     | playerName   |          |
|                     | blockName    |          |
|                     | blockData    |          |
|                     | x            |          |
|                     | y            |          |
|                     | z            |          |
|                     | dimension    |          |
|                     |              |          |
| entityDie           | time         |          |
|                     | attackerId   |          |
|                     | attackerName |          |
|                     | victimId     |          |
|                     | cause        |          |
|                     | x            |          |
|                     | y            |          |
|                     | z            |          |
|                     | dimension    |          |
|                     |              |          |
| getElytra           | time         |          |
|                     | playerName   |          |
|                     | x            |          |
|                     | y            |          |
|                     | z            |          |
|                     | dimension    |          |
|                     |              |          |
| itemThrow           | time         |          |
|                     | playerName   |          |
|                     | itemName     |          |
|                     | x            |          |
|                     | y            |          |
|                     | z            |          |
|                     | dimension    |          |
|                     |              |          |
| lightningHitBlock   | time         |          |
|                     | blockName    |          |
|                     | blockData    |          |
|                     | x            |          |
|                     | y            |          |
|                     | z            |          |
|                     | dimension    |          |
|                     |              |          |
| playerAttack        | time         |          |
|                     | playerName   |          |
|                     | victimId     |          |
|                     | victimName   |          |
|                     | x            |          |
|                     | y            |          |
|                     | z            |          |
|                     | dimension    |          |
|                     |              |          |
| signBlockPlace      | time         |          |
|                     | playerName   |          |
|                     | id           |          |
|                     | side         |          |
|                     | text         |          |
|                     | x            |          |
|                     | y            |          |
|                     | z            |          |
|                     | dimension    |          |

## めも

- .envを作成する。
  - SQL_PASSWORD
  - SQL_DATABASE
