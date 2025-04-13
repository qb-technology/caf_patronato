import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { generateId } from '~~/server/utils/id_generator';

export const members = sqliteTable('members', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId('user')),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  avatar: text('avatar'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
