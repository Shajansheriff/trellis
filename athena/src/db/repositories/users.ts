import { eq } from 'drizzle-orm';
import { DB } from '../client';
import { UserInsert, users } from '../schema';
import { getFirst } from '@/utils/array';

export class UsersRepository {
  constructor(private readonly db: DB) {}

  async createUser(user: UserInsert) {
    return this.db.insert(users).values(user);
  }

  async getByEmail(email: string) {
    return this.db.select().from(users).where(eq(users.email, email)).then(getFirst);
  }

  async getUserById(id: number) {
    return this.db.select().from(users).where(eq(users.id, id));
  }
}
