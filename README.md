# WEREWOLF TYPE V1 — Character Integrated

React + Vite + TypeScript の人狼プレイスタイル診断です。

## 起動

```powershell
npm.cmd install
npm.cmd run dev
```

## キャラクター画像

`public/characters/` に32タイプのPNGを配置しています。
診断結果の `profile.code` に応じて、たとえば `LABS-I` なら以下を自動表示します。

```text
/characters/LABS-I.png
```

画像を差し替える場合は、同じファイル名のPNGで上書きすればコード変更は不要です。

## 主な機能
- 25問 / 5軸 / 32タイプ判定
- 4グループカラー
- スマホレスポンシブ
- 6役職適性 + 専用SVG紋章
- 霊媒師表記
- 結果タイプに連動するキャラクター画像
