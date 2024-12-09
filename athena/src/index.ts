import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
// import { jwt } from 'hono/jwt';

const app = new Hono();

// app.use(cors());
// app.use('/api/*', jwt({ secret: process.env.JWT_SECRET! }));

const withPrefix = (path: string) => `/api/v1/${path}`;
// Organizations
app.post(withPrefix('organizations'), async (c) => {
  /* Create organization */
  return c.json({ message: 'Create organization' });
});
app.get(withPrefix('organizations/:id'), async (c) => {
  /* Get organization */
  return c.json({ message: 'Get organization' });
});
app.patch(withPrefix('organizations/:id'), async (c) => {
  /* Update organization */
  return c.json({ message: 'Update organization' });
});
app.delete(withPrefix('organizations/:id'), async (c) => {
  /* Delete organization */
  return c.json({ message: 'Delete organization' });
});

// Users
app.post(withPrefix('users'), async (c) => {
  /* Create user */
  return c.json({ message: 'Create user' });
});
app.get(withPrefix('users/:id'), async (c) => {
  /* Get user */
  const id = c.req.param('id');
  return c.json({ message: `Get user ${id}` });
});
app.get(withPrefix('users'), async (c) => {
  /* List users */
  return c.json({ message: 'List users' });
});
app.patch(withPrefix('users/:id'), async (c) => {
  /* Update user */
});
app.delete(withPrefix('users/:id'), async (c) => {
  /* Delete user */
});

// User Invites
app.post(withPrefix('user_invites'), async (c) => {
  /* Create invite */
  return c.json({ message: 'Create invite' });
});
app.get(withPrefix('user_invites/:id'), async (c) => {
  /* Get invite */
  return c.json({ message: `Get invite ${id}` });
});
app.post(withPrefix('user_invites/:id/accept'), async (c) => {
  /* Accept invite */
  return c.json({ message: `Accept invite ${id}` });
});
app.post(withPrefix('user_invites/:id/reject'), async (c) => {
  /* Reject invite */
  return c.json({ message: `Reject invite ${id}` });
});

// Departments
app.post(withPrefix('departments'), async (c) => {
  /* Create department */
  return c.json({ message: 'Create department' });
});
app.get(withPrefix('departments/:id'), async (c) => {
  /* Get department */
  return c.json({ message: `Get department ${id}` });
});
app.get(withPrefix('departments'), async (c) => {
  /* List departments */
});
app.patch(withPrefix('departments/:id'), async (c) => {
  /* Update department */
});
app.delete(withPrefix('departments/:id'), async (c) => {
  /* Delete department */
});

// Survey Templates
app.post(withPrefix('survey_templates'), async (c) => {
  /* Create template */
  return c.json({ message: 'Create template' });
});
app.get(withPrefix('survey_templates/:id'), async (c) => {
  /* Get template */
  const id = c.req.param('id');
  return c.json({ message: `Get template ${id}` });
});
app.get(withPrefix('survey_templates'), async (c) => {
  /* List templates */
  return c.json({ message: 'List templates' });
});
app.patch(withPrefix('survey_templates/:id'), async (c) => {
  /* Update template */
});
app.delete(withPrefix('survey_templates/:id'), async (c) => {
  /* Delete template */
});
app.post(withPrefix('survey_templates/:id/publish'), async (c) => {
  /* Publish template */
});
app.post(withPrefix('survey_templates/:id/archive'), async (c) => {
  /* Archive template */
});

// Question Templates
app.post(withPrefix('question_templates'), async (c) => {
  /* Create question template */
  return c.json({ message: 'Create question template' });
});
app.get(withPrefix('question_templates/:id'), async (c) => {
  /* Get question template */
  const id = c.req.param('id');
  return c.json({ message: `Get question template ${id}` });
});
app.get(withPrefix('question_templates'), async (c) => {
  /* List question templates */
  return c.json({ message: 'List question templates' });
});
app.patch(withPrefix('question_templates/:id'), async (c) => {
  /* Update question template */
});
app.delete('/api/v1/question_templates/:id', async (c) => {
  /* Delete question template */
});

// Surveys
app.post('/api/v1/surveys', async (c) => {
  /* Create survey */
});
app.get('/api/v1/surveys/:id', async (c) => {
  /* Get survey */
});
app.get('/api/v1/surveys', async (c) => {
  /* List surveys */
});
app.patch('/api/v1/surveys/:id', async (c) => {
  /* Update survey */
});
app.delete('/api/v1/surveys/:id', async (c) => {
  /* Delete survey */
});

// Survey Responses
app.post('/api/v1/surveys/:survey_id/responses', async (c) => {
  /* Create response */
});
app.get('/api/v1/surveys/:survey_id/responses/:id', async (c) => {
  /* Get response */
});
app.get('/api/v1/surveys/:survey_id/responses', async (c) => {
  /* List responses */
});

// Survey Answers
app.post('/api/v1/survey_responses/:response_id/answers', async (c) => {
  /* Submit answer */
});
app.get('/api/v1/survey_responses/:response_id/answers', async (c) => {
  /* List answers */
});

// Reviews
app.post('/api/v1/reviews', async (c) => {
  /* Create review */
});
app.get('/api/v1/reviews/:id', async (c) => {
  /* Get review */
});
app.get('/api/v1/reviews', async (c) => {
  /* List reviews */
});
app.patch('/api/v1/reviews/:id', async (c) => {
  /* Update review */
});
app.patch('/api/v1/reviews/:id/extend', async (c) => {
  /* Extend review deadline */
});

// Review Questions
app.post('/api/v1/reviews/:review_id/questions', async (c) => {
  /* Create review question */
});
app.get('/api/v1/reviews/:review_id/questions', async (c) => {
  /* List review questions */
});
app.patch('/api/v1/reviews/:review_id/questions/:id', async (c) => {
  /* Update review question */
});

// Review Answers
app.post('/api/v1/reviews/:review_id/answers', async (c) => {
  /* Submit review answer */
});
app.get('/api/v1/reviews/:review_id/answers', async (c) => {
  /* List review answers */
});
app.patch('/api/v1/reviews/:review_id/answers/:id', async (c) => {
  /* Update review answer */
});

// Feedback
app.post('/api/v1/feedbacks', async (c) => {
  /* Request feedback */
});
app.get('/api/v1/feedbacks/:id', async (c) => {
  /* Get feedback */
});
app.get('/api/v1/feedbacks', async (c) => {
  /* List feedbacks */
});
app.patch('/api/v1/feedbacks/:id', async (c) => {
  /* Update feedback */
});
app.post('/api/v1/feedbacks/:id/complete', async (c) => {
  /* Complete feedback */
});
app.post('/api/v1/feedbacks/:id/decline', async (c) => {
  /* Decline feedback */
});

const port = 3000;

serve({
  fetch: app.fetch,
  port,
});
