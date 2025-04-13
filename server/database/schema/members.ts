import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { generateId } from '../../utils/id_generator';
import { teamsToMembers } from './teams';
import { orders } from './order';

// members table
export const members = sqliteTable('member', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId('user')),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  avatar: text('avatar'),
  bio: text('bio'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// relations of member table
export const membersRelation = relations(members, ({ many }) => ({
  teamsToMembers: many(teamsToMembers),
  orders: many(orders),
}));
