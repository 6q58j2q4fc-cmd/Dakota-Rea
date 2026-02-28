CREATE TABLE `email_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`toEmail` varchar(320) NOT NULL,
	`fromEmail` varchar(320) NOT NULL,
	`subject` varchar(500) NOT NULL,
	`emailType` varchar(100) NOT NULL,
	`status` enum('pending','sent','failed','bounced') NOT NULL DEFAULT 'pending',
	`errorMessage` text,
	`referenceId` int,
	`referenceType` varchar(100),
	`sentAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `email_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscribers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`firstName` varchar(255),
	`lastName` varchar(255),
	`passwordHash` varchar(255),
	`verificationToken` varchar(255),
	`isVerified` int NOT NULL DEFAULT 0,
	`isActive` int NOT NULL DEFAULT 1,
	`tags` json,
	`lastLoginAt` timestamp,
	`sessionToken` varchar(255),
	`sessionExpiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscribers_id` PRIMARY KEY(`id`),
	CONSTRAINT `subscribers_email_unique` UNIQUE(`email`)
);
