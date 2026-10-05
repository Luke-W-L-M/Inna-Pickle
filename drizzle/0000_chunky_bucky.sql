CREATE TABLE `interests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`kind` text NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`business` text DEFAULT '' NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`consent` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `interests_email_kind` ON `interests` (`email`,`kind`);