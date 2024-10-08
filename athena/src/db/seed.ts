import { db } from './client';
import { departments, organizations, access_roles, users } from './schema';

const seed = async () => {
  const [organization] = await db
    .insert(organizations)
    .values({
      name: 'Athena',
    })
    .returning();
  await db.insert(departments).values({
    name: 'Engineering',
    organization_id: organization.id,
  });
  await db.insert(access_roles).values({
    name: 'Engineering Manager',
    organization_id: organization.id,
  });

  await db.insert(users).values({
    email: 'test@test.com',
    first_name: 'Test',
    last_name: 'User',
    organization_id: organization.id,
  });

  console.log('Seeded database');
};

seed();
