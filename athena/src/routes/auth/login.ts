import { db } from '@/db';
import { UsersRepository } from '@/db/repositories/users';
import { Context } from 'hono';
import { z } from 'zod';
import { LoginService } from './login.service';

export async function login(c: Context) {
  const body = await c.req.json();
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const result = schema.safeParse(body);
  if (!result.success) {
    return c.json({ error: result.error.issues[0].message }, 400);
  }

  const { email, password } = result.data;
  const usersRepository = new UsersRepository(db);
  const loginService = new LoginService(usersRepository);
  const response = await loginService.login(email, password);

  return c.json(response);
}
