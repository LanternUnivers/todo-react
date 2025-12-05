# Todo React

Docker で動く React + SQLite の Todo アプリです。バックエンドは Express/SQLite、フロントエンドは Vite + React で構成されています。

## 必要要件
- Docker / Docker Compose

## 使い方

### イメージのビルドと起動
```
docker compose up --build
```

- http://localhost:3000 でアプリが開きます。
- Todo データは Docker ボリューム `todo-data` に保存されます。

### 開発モード
フロントとバックを別々に動かす場合は依存をインストールしてください。

```
# バックエンド
cd server
npm install
npm run dev

# フロントエンド（別ターミナル）
cd client
npm install
npm run dev
```

- フロントの開発サーバーは http://localhost:5173
- API は http://localhost:3000/api

## API エンドポイント
- `GET /api/todos` : すべての Todo を取得
- `POST /api/todos` : `{ title }` で新規作成
- `PUT /api/todos/:id` : `{ title, completed }` で更新
- `DELETE /api/todos/:id` : 削除

## 環境変数
- `PORT`: サーバーポート（デフォルト 3000）
- `DB_FILE`: SQLite ファイルパス（デフォルト `server/data/todos.db`）
