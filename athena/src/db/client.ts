import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import * as schema from './schema';

// In-memory Postgres
const client = new PGlite();

const db = drizzle(client, { schema });

export { db };
