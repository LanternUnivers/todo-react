# Todo React

Docker で動く React + PostgreSQL の Todo アプリです。バックエンドは Express/PG、フロントエンドは Vite + React で構成されています。

## 必要要件
- Docker / Docker Compose

## 使い方

### イメージのビルドと起動
```
docker compose up --build
```

- http://localhost:3000 でアプリが開きます。
- Todo データは Docker ボリューム `pgdata` に保存されます（PostgreSQL）。

### 開発モード
フロントとバックを別々に動かす場合は依存をインストールしてください。

```
# バックエンド
cd server
npm install
PGHOST=localhost PGUSER=todo PGPASSWORD=todo PGDATABASE=todo npm run dev

# フロントエンド（別ターミナル）
cd client
npm install
npm run dev
```

- フロントの開発サーバーは http://localhost:5173
- API は http://localhost:3000/api（PostgreSQL を別途起動してください）

## API エンドポイント
- `GET /api/todos` : すべての Todo を取得
- `POST /api/todos` : `{ title }` で新規作成
- `PUT /api/todos/:id` : `{ title, completed }` で更新
- `DELETE /api/todos/:id` : 削除

## 環境変数
- `PORT`: サーバーポート（デフォルト 3000）
- `PGHOST`: PostgreSQL ホスト名（デフォルト `db`）
- `PGPORT`: PostgreSQL ポート（デフォルト `5432`）
- `PGUSER`: PostgreSQL ユーザー（デフォルト `todo`）
- `PGPASSWORD`: PostgreSQL パスワード（デフォルト `todo`）
- `PGDATABASE`: PostgreSQL データベース名（デフォルト `todo`）
