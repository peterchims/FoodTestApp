import { pgTable, integer, text, boolean, timestamp, uuid } from 'drizzle-orm/pg-core';

export const TestApp = pgTable('TestApp', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  user_id: uuid('user_id').notNull(),
  recipe_id: text('recipe_id'),
  title: text('title').notNull(),
  image: text('image'), // Change from boolean to text
  cook_title: text('cook_title'),
  servings: integer('servings'),
  created_at: timestamp('created_at').defaultNow().notNull(),
});