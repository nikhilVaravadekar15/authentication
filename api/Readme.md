## Getting started

[expressjs-.18.1](https://expressjs.com/)

[socket.io](https://socket.io/)

[peerjs](https://peerjs.com/)

[orm.drizzle](https://orm.drizzle.team/)

[orm.drizzle/better-sqlite3](https://orm.drizzle.team/docs/quick-sqlite/better-sqlite3)

[orm.drizzle/sqlite/column-types](https://orm.drizzle.team/docs/column-types/sqlite)

## drizzle-kit
```
    npx drizzle-kit generate:pg;
    npx drizzle-kit push:pg;

    # To drop migrations
    npx drizzle-kit drop;
```

"dev": "concurrently \"npx drizzle-kit push:sqlite;\" \"npx tsc --watch\" \"nodemon dist/index.js\""
