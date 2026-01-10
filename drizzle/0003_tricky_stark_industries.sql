CREATE TABLE `booking_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`meetingType` varchar(50) NOT NULL,
	`requestedDate` timestamp NOT NULL,
	`requestedTime` varchar(10) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`company` varchar(255),
	`message` text,
	`status` enum('pending','confirmed','declined','cancelled') NOT NULL DEFAULT 'pending',
	`adminNotes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `booking_requests_id` PRIMARY KEY(`id`)
);
