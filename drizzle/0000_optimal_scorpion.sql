CREATE TABLE IF NOT EXISTS "Users" (
	"id" serial NOT NULL,
	"fname" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"provider" varchar(20) NOT NULL,
	"external_id" varchar(100) NOT NULL,
	"image" text NOT NULL,
	"role" varchar(12) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" serial NOT NULL,
	"name" varchar(100) NOT NULL,
	"image" text NOT NULL,
	"description" varchar(225) NOT NULL,
	"price" integer NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
