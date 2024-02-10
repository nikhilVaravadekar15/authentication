ALTER TABLE "user" DROP CONSTRAINT "user_token_token_id_fk";
--> statement-breakpoint
ALTER TABLE "token" ADD COLUMN "user" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token" ADD CONSTRAINT "token_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "token";