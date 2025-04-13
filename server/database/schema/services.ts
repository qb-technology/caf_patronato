import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { generateId } from '../../utils/id_generator';
import { teams } from './teams';

// members table
export const services = sqliteTable('services', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId('service')),
  name: text('name'),
  description: text('description'),
  teamId: text('team_id')
    .notNull()
    .references(() => teams.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
  metadata: text('metadata', { mode: 'json' }),
});

// relations of order table
export const servicesRelations = relations(services, ({ one, many }) => ({
  team: one(teams, { fields: [services.teamId], references: [teams.id] }),
  prices: many(prices),
}));

// price table
export const prices = sqliteTable('prices', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId('price')),
  amount: real('amount'),
  currencyCode: text('currency_code'),
  serviceId: text('service_id')
    .notNull()
    .references(() => services.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
  metadata: text('metadata', { mode: 'json' }),
});

export const pricesRelations = relations(prices, ({ one }) => ({
  service: one(services, {
    fields: [prices.serviceId],
    references: [services.id],
  }),
}));
