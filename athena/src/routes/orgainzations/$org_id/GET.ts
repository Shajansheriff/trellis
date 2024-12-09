import { Context } from 'hono';

export const GET = async (c: Context) => {
  const org_id = c.req.param('org_id');
  return c.json({ message: `Get organization ${org_id}` });
};
