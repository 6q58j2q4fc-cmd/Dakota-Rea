ALTER TABLE `subscribers` ADD `stripeCustomerId` varchar(255);--> statement-breakpoint
ALTER TABLE `subscribers` ADD `stripeSubscriptionId` varchar(255);--> statement-breakpoint
ALTER TABLE `subscribers` ADD `membershipPlan` varchar(50);--> statement-breakpoint
ALTER TABLE `subscribers` ADD `membershipStatus` enum('active','cancelled','past_due','trialing');--> statement-breakpoint
ALTER TABLE `subscribers` ADD `membershipEndsAt` timestamp;