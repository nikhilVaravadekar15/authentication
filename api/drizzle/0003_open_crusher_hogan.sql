ALTER TABLE "user" DROP CONSTRAINT "user_username_unique";--> statement-breakpoint
ALTER TABLE "token" DROP COLUMN IF EXISTS "refresh_token";