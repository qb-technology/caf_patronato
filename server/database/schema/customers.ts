import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { generateId } from '../../utils/id_generator';
import { teams } from './teams';
import { orders } from './order';

// customer table
export const customers = sqliteTable('customer', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId('customer')),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').unique(),
  password: text('password'),
  phoneNumber: text('phone_number'),
  dob: integer('date_of_birth', { mode: 'timestamp' }),
  nationality: text('nationality'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// relations of customer table
export const customersRelations = relations(customers, ({ many }) => ({
  customersToTeams: many(customersToTeams),
  orders: many(orders),
}));

// table of the many to many relations btn customers & teams
export const customersToTeams = sqliteTable(
  'customers_to_teams',
  {
    customerId: text('customer_id')
      .notNull()
      .references(() => customers.id),
    teamId: text('team_id')
      .notNull()
      .references(() => teams.id),
  },
  (t) => [primaryKey({ columns: [t.customerId, t.teamId] })],
);
