#!/bin/bash

export $(grep -v '^#' Back/.env | tr -d '\r' | xargs)

mkdir -p ./mongodb/initdb.d/

cat <<EOF > ./mongodb/initdb.d/mongo-init.js
db = db.getSiblingDB("$DB_NAME");

db.createUser({
  user: "$MONGO_INITDB_ROOT_USERNAME",
  pwd: "$MONGO_INITDB_ROOT_PASSWORD",
  roles: [
    {
      role: "readWrite",
      db: "$DB_NAME"
    }
  ]
});

db.createCollection("datas");

db.datas.insertMany( [
  { avatarLength: 9 },
  { tabIndex: [8] },
] )
EOF
