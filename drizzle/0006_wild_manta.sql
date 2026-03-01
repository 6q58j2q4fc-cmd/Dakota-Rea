CREATE TABLE `qa_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`subscriberId` int NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(255) NOT NULL,
	`requestedDate` timestamp NOT NULL,
	`requestedTime` varchar(10) NOT NULL,
	`topic` text,
	`questions` text,
	`status` enum('pending','confirmed','completed','cancelled') NOT NULL DEFAULT 'pending',
	`creditMonth` varchar(7) NOT NULL,
	`meetingLink` text,
	`adminNotes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `qa_sessions_id` PRIMARY KEY(`id`)
);
