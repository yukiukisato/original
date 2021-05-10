#テーブル設計
 users テーブル

| Column   | Type   | Options     |
| -------- | ------ | ----------- |
| name     | string | null: false |
| email    | string | null: false |
| password | string | null: false |

 Association

- has_many :post_users
- has_many :posts, through: post_users
- has_many :messages

 posts テーブル

| Column | Type   | Options     |
| ------ | ------ | ----------- |
| name   | string | null: false |

 Association

- has_many :post_users
- has_many :users, through: post_users
- has_many :messages

 post_users テーブル

| Column | Type       | Options                        |
| ------ | ---------- | ------------------------------ |
| user   | references | null: false, foreign_key: true |
| room   | references | null: false, foreign_key: true |

Association

- belongs_to :post
- belongs_to :user

messages テーブル

| Column  | Type       | Options                        |
| ------- | ---------- | ------------------------------ |
| content | string     |                                |
| user    | references | null: false, foreign_key: true |
| room    | references | null: false, foreign_key: true |

Association

- belongs_to :post
- belongs_to :user