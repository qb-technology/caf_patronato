import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { generateId } from '../../utils/id_generator';
import { teams } from './teams';
import { customers } from './customers';
import { members } from './members';

// members table
export const orders = sqliteTable('orders', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId('order')),
  note: text('note'),
  phoneNumber: text('phone_number'),
  price: real('price').notNull(),
  createdBy: text('created_by').references(() => members.id),
  customerId: text('customer_id').references(() => customers.id),
  teamId: text('team_id').references(() => teams.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
  metadata: text('metadata', { mode: 'json' }),
});

// relations of order table
export const ordersRelations = relations(orders, ({ one }) => ({
  team: one(teams, { fields: [orders.teamId], references: [teams.id] }),
  customer: one(customers, {
    fields: [orders.customerId],
    references: [customers.id],
  }),
  member: one(members, {
    fields: [orders.createdBy],
    references: [members.id],
    relationName: 'employee',
  }),
}));
