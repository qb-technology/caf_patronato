/* eslint-disable @typescript-eslint/no-unused-vars */
import { customers, customersToTeams } from './schema/customers';
import { members } from './schema/members';
import { orders } from './schema/order';
import { services, prices } from './schema/services';
import { teams, teamsToMembers } from './schema/teams';

// const db = useDrizzle();
export async function seedDatabase() {
  // Seed customers
  const customerData = Array.from({ length: 10 }).map((_, i) => ({
    id: `customer-${i + 1}`,
    firstName: `FirstName${i + 1}`,
    lastName: `LastName${i + 1}`,
    email: `customer${i + 1}@example.com`,
    password: `password${i + 1}`,
    phoneNumber: `123456789${i}`,
    dob: new Date(Date.now() - i * 1000000000),
    nationality: `Country${i + 1}`,
    createdAt: new Date(),
  }));
  //   await db.insert(customers).values(customerData);

  // Seed members
  const memberData = Array.from({ length: 10 }).map((_, i) => ({
    id: `member-${i + 1}`,
    name: `MemberName${i + 1}`,
    email: `member${i + 1}@example.com`,
    password: `password${i + 1}`,
    avatar: `https://example.com/avatar${i + 1}.png`,
    bio: `Bio for member ${i + 1}`,
    createdAt: new Date(),
  }));
  //   await db.insert(members).values(memberData);

  // Seed teams
  const teamData = Array.from({ length: 10 }).map((_, i) => ({
    id: `team-${i + 1}`,
    name: `TeamName${i + 1}`,
    admin: i < 10 ? `member-${i + 1}` : null, // Assign admin from members
    createdAt: new Date(),
  }));
  //   await db.insert(teams).values(teamData);

  // Seed customersToTeams (many-to-many relation)
  const customersToTeamsData = Array.from({ length: 10 }).map((_, i) => ({
    customerId: `customer-${(i % 10) + 1}`,
    teamId: `team-${(i % 10) + 1}`,
  }));
  //   await db.insert(customersToTeams).values(customersToTeamsData);

  // Seed teamsToMembers (many-to-many relation)
  const teamsToMembersData = Array.from({ length: 10 }).map((_, i) => ({
    teamId: `team-${(i % 10) + 1}`,
    memberId: `member-${(i % 10) + 1}`,
  }));
  //   await db.insert(teamsToMembers).values(teamsToMembersData);

  // Seed services
  const serviceData = Array.from({ length: 10 }).map((_, i) => ({
    id: `service-${i + 1}`,
    name: `ServiceName${i + 1}`,
    description: `Description for service ${i + 1}`,
    teamId: `team-${(i % 10) + 1}`,
    createdAt: new Date(),
    updatedAt: new Date(),
    //metadata: JSON.stringify({ key: `value${i + 1}` }),
  }));

  //   await db.insert(services).values(serviceData);

  // Seed prices
  const priceData = Array.from({ length: 10 }).map((_, i) => ({
    id: `price-${i + 1}`,
    amount: (i + 1) * 10,
    currencyCode: `USD`,
    serviceId: `service-${(i % 10) + 1}`,
    createdAt: new Date(),
    updatedAt: new Date(),
    //metadata: JSON.stringify({ discount: `${i * 5}%` }),
  }));
  //   await db.insert(prices).values(priceData);

  // Seed orders
  const orderData = Array.from({ length: 10 }).map((_, i) => ({
    id: `order-${i + 1}`,
    note: `Note for order ${i + 1}`,
    phoneNumber: `987654321${i}`,
    price: (i + 1) * 100,
    createdBy: `member-${(i % 10) + 1}`,
    customerId: `customer-${(i % 10) + 1}`,
    teamId: `team-${(i % 10) + 1}`,
    createdAt: new Date(),
    updatedAt: new Date(),
    //metadata: JSON.stringify({ specialInstructions: `Instruction ${i + 1}` }),
  }));
  //   await db.insert(orders).values(orderData);

  console.log('Database seeded successfully!');

  return {
    customerData,
    teamData,
    memberData,
    orderData,
    serviceData,
    priceData,
    teamsToMembersData,
    customersToTeams,
    customersToTeamsData,
  };
}

// seedDatabase().catch((err) => {
//   console.error('Error seeding database:', err);
// });
