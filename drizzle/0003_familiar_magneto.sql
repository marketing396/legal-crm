CREATE TABLE `audit_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`enquiryId` int NOT NULL,
	`userId` int NOT NULL,
	`action` enum('created','updated','deleted','status_changed','assigned') NOT NULL,
	`fieldName` varchar(100),
	`oldValue` text,
	`newValue` text,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_enquiryId_enquiries_id_fk` FOREIGN KEY (`enquiryId`) REFERENCES `enquiries`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;