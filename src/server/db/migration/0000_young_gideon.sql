CREATE TABLE `chanom_account` (
	`userId` text(255) NOT NULL,
	`type` text(255) NOT NULL,
	`provider` text(255) NOT NULL,
	`providerAccountId` text(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text(255),
	`scope` text(255),
	`id_token` text,
	`session_state` text(255),
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `chanom_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `chanom_chat_message` (
	`chat_message_id` text(255) PRIMARY KEY NOT NULL,
	`room_id` integer NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`user_id` text(255) NOT NULL,
	FOREIGN KEY (`room_id`) REFERENCES `chanom_chat_room`(`room_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `chanom_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `chanom_chat_message_reaction` (
	`chat_message_id` text(255) NOT NULL,
	`user_id` text(255) NOT NULL,
	`reaction` text(255) NOT NULL,
	`reacted_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`chat_message_id`) REFERENCES `chanom_chat_message`(`chat_message_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `chanom_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `chanom_chat_room_participant` (
	`room_id` integer NOT NULL,
	`user_id` text(255) NOT NULL,
	`joined_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`room_id`) REFERENCES `chanom_chat_room`(`room_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `chanom_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `chanom_chat_room` (
	`room_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text(255) NOT NULL,
	`room_type` text NOT NULL,
	`latest_message` text(255),
	`latest_message_at` integer,
	`is_latest_message_read` integer DEFAULT false NOT NULL,
	`is_pin` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `chanom_session` (
	`session_token` text(255) PRIMARY KEY NOT NULL,
	`user_id` text(255) NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `chanom_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `chanom_user` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255),
	`username` text(255),
	`email` text(255) NOT NULL,
	`emailVerified` integer,
	`image` text(255)
);
--> statement-breakpoint
CREATE TABLE `chanom_verification_token` (
	`identifier` text(255) NOT NULL,
	`token` text(255) NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `chanom_account` (`userId`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `chanom_session` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `chanom_user_username_unique` ON `chanom_user` (`username`);