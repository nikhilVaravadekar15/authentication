import {
  timestamp,
  pgTable,
  text,
  boolean,
  primaryKey,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const user = pgTable("user", {
  id: text("id")
    .primaryKey()
    .unique()
    .notNull()
    .$defaultFn(() => createId()),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  is_verified: boolean("is_verified").notNull().default(false),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const token = pgTable("token", {
  id: text("id")
    .primaryKey()
    .unique()
    .notNull()
    .$defaultFn(() => createId()),
  token: text("token").notNull(),
  user: text("user")
    .notNull()
    .references(() => user.id),
  created_at: timestamp("created_at").notNull().defaultNow(),
});
