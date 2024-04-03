import { relations, sql } from "drizzle-orm";
import {
  index,
  int,
  primaryKey,
  sqliteTableCreator,
  text,
} from "drizzle-orm/sqlite-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `chanom_${name}`);

export const users = createTable("user", {
  id: text("id", { length: 255 }).notNull().primaryKey(),
  name: text("name", { length: 255 }),
  username: text("username", { length: 255 }).unique(),
  email: text("email", { length: 255 }).notNull(),
  emailVerified: int("emailVerified", { mode: "timestamp" }),
  image: text("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: text("userId", { length: 255 })
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    type: text("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: text("provider", { length: 255 }).notNull(),
    providerAccountId: text("providerAccountId", { length: 255 }).notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: int("expires_at"),
    tokenType: text("token_type", { length: 255 }),
    scope: text("scope", { length: 255 }),
    idToken: text("id_token"),
    sessionState: text("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    id: text("id").notNull().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    expiresAt: int("expires_at").notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const chatRooms = createTable("chat_room", {
  roomId: int("room_id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  title: text("title", { length: 255 }).notNull(),
  roomType: text("room_type", { enum: ["direct", "group"] }).notNull(),
  latestMessage: text("latest_message", { length: 255 }),
  latestMessageAt: int("latest_message_at", { mode: "timestamp" }),
});

export const chatRoomParticipants = createTable("chat_room_participant", {
  roomId: int("room_id", { mode: "number" })
    .notNull()
    .references(() => chatRooms.roomId),
  userId: text("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  joinedAt: int("joined_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  isLatestMessageRead: int("is_latest_message_read", {
    mode: "boolean",
  })
    .notNull()
    .default(false),
  isPin: int("is_pin", { mode: "boolean" }).notNull().default(false),
});

export const chatRoomsRelations = relations(chatRooms, ({ many }) => ({
  participants: many(chatRoomParticipants),
}));

export const chatMessages = createTable("chat_message", {
  chatMessageId: text("chat_message_id", { length: 255 })
    .notNull()
    .primaryKey(),
  roomId: int("room_id", { mode: "number" })
    .notNull()
    .references(() => chatRooms.roomId),
  createdAt: int("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  userId: text("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
});

export const chatMessagesReactions = createTable("chat_message_reaction", {
  chatMessageId: text("chat_message_id", { length: 255 })
    .notNull()
    .references(() => chatMessages.chatMessageId),
  userId: text("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  reaction: text("reaction", { length: 255 }).notNull(),
  reactedAt: int("reacted_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const chatMessagesRelations = relations(
  chatMessages,
  ({ one, many }) => ({
    room: one(chatRooms, {
      fields: [chatMessages.roomId],
      references: [chatRooms.roomId],
    }),
    user: one(users, { fields: [chatMessages.userId], references: [users.id] }),
    reactions: many(chatMessagesReactions),
  }),
);

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: text("identifier", { length: 255 }).notNull(),
    token: text("token", { length: 255 }).notNull(),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
