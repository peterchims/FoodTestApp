CREATE TABLE "TestApp" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "TestApp_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" uuid NOT NULL,
	"recipe_id" text,
	"title" text NOT NULL,
	"image" text,
	"cook_title" text,
	"servings" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
