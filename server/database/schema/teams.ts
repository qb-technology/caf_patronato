import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { generateId } from '../../utils/id_generator';
import { members } from './members';
import { customersToTeams } from './customers';
import { orders } from './order';

// team table
export const teams = sqliteTable('team', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId('team')),
  name: text('name').notNull(),
  admin: text('admin').references(() => members.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// relations of team table
export const teamRelations = relations(teams, ({ many, one }) => ({
  teamsToMembers: many(teamsToMembers),
  adminId: one(members, { fields: [teams.admin], references: [members.id] }),
  customersToTeams: many(customersToTeams),
  orders: many(orders),
}));

// many to many table of team & members tables
export const teamsToMembers = sqliteTable(
  'teams_to_members',
  {
    teamId: text('team_id')
      .notNull()
      .references(() => teams.id),
    memberId: text('member_id')
      .notNull()
      .references(() => members.id),
  },
  (t) => [primaryKey({ columns: [t.memberId, t.teamId] })],
);
