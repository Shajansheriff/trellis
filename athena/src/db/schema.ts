import { sql } from 'drizzle-orm';
import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  json,
  pgEnum,
  varchar,
  unique,
} from 'drizzle-orm/pg-core';

const id = serial('id').primaryKey();
const created_at = timestamp('created_at').defaultNow();

export const orgs = pgTable('orgs', {
  id,
  name: varchar('name', { length: 100 }).notNull().unique(),
  logo_url: varchar('logo_url', { length: 255 }),
  domain: varchar('domain', { length: 100 }).unique(),
  created_at,
});
const org_id = integer('org_id')
  .references(() => orgs.id)
  .notNull();

const user_status_enum = pgEnum('user_status', ['active', 'inactive']);
export const users = pgTable('users', {
  id,
  email: varchar('email', { length: 100 }).notNull().unique(),
  first_name: varchar('first_name', { length: 100 }).notNull(),
  last_name: varchar('last_name', { length: 100 }).notNull(),
  status: user_status_enum('status').default('active'),
  job_title: varchar('job_title', { length: 100 }),
  deleted_at: timestamp('deleted_at'),
  org_id,
  created_at,
});

export const departments = pgTable('departments', {
  id,
  name: text('name').notNull(),
  org_id,
  created_at,
});

const invitationStatusEnum = pgEnum('invitation_status', ['PENDING', 'ACCEPTED', 'REJECTED']);
export const invitations = pgTable(
  'invitations',
  {
    id,
    email: varchar('email', { length: 100 }).notNull(),
    inviter_id: integer('inviter_id')
      .references(() => users.id)
      .notNull(),
    status: invitationStatusEnum('status').default('PENDING'),
    org_id,
    created_at,
  },
  (table) => {
    return {
      unique_email_per_org_per_status: unique().on(table.email, table.org_id, table.status),
    };
  },
);

const surveyStatusEnum = pgEnum('survey_status', ['DRAFT', 'PUBLISHED', 'ARCHIVED']);
export const survey_templates = pgTable(
  'survey_templates',
  {
    id,
    title: varchar('title', { length: 100 }).notNull(),
    description: varchar('description', { length: 255 }),
    status: surveyStatusEnum('status').default('DRAFT'),
    created_by: integer('created_by')
      .references(() => users.id)
      .notNull(),
    org_id,
    created_at,
  },
  (table) => {
    return {
      unique_title_per_org: unique().on(table.title, table.org_id),
    };
  },
);

export const surveys = pgTable('surveys', {
  id,
  title: varchar('title', { length: 100 }).notNull(),
  description: varchar('description', { length: 255 }),
  template_id: integer('template_id').references(() => survey_templates.id),
  start_date: timestamp('start_date').notNull(),
  end_date: timestamp('end_date').notNull(),
  created_by: integer('created_by')
    .references(() => users.id)
    .notNull(),
  org_id,
  created_at,
});

const surveyQuestionTypeEnum = pgEnum('survey_question_type', [
  'RATING',
  'TEXT',
  'RATING_AND_TEXT',
]);

export const survey_question_templates = pgTable('survey_question_templates', {
  id,
  survey_template_id: integer('survey_template_id')
    .references(() => survey_templates.id)
    .notNull(),
  question_text: text('question_text').notNull(),
  instructions: text('instructions'),
  order: integer('order').notNull(),
  default_value: text('default_value'),
  question_type: surveyQuestionTypeEnum('question_type').notNull().default('RATING'),
  required: boolean('required').default(false),
  org_id,
  created_at,
});

export const survey_questions = pgTable('survey_questions', {
  id,
  survey_id: integer('survey_id')
    .references(() => surveys.id)
    .notNull(),
  question_template_id: integer('question_template_id').references(
    () => survey_question_templates.id,
  ),
  org_id,
  created_at,
});

export const survey_responses = pgTable('survey_responses', {
  id,
  survey_id: integer('survey_id')
    .references(() => surveys.id)
    .notNull(),
  employee_id: integer('employee_id')
    .references(() => users.id)
    .notNull(),
  org_id,
  created_at,
});

export const survey_answers = pgTable('survey_answers', {
  id,
  response_id: integer('response_id')
    .references(() => survey_responses.id)
    .notNull(),
  question_id: integer('question_id')
    .references(() => survey_questions.id)
    .notNull(),
  answer: text('answer'),
  rating: integer('rating'), // For ratings (e.g., 1-5)
  org_id,
  created_at,
});

export const reviews = pgTable('reviews', {
  id,
  employee_id: integer('employee_id')
    .references(() => users.id)
    .notNull(),
  start_date: timestamp('start_date').notNull(),
  end_date: timestamp('end_date').notNull(),
  extended_end_date: timestamp('extended_end_date'),
  org_id,
  created_at,
});

// Enum for Review Question Types
const reviewQuestionTypeEnum = pgEnum('review_question_type', ['text', 'rating']);
export const review_questions = pgTable('review_questions', {
  id,
  review_id: integer('review_id')
    .references(() => reviews.id)
    .notNull(),
  question_text: text('question_text').notNull(),
  question_type: reviewQuestionTypeEnum('question_type').notNull(), // 'text', 'rating'
  org_id,
  created_at,
});

export const review_answers = pgTable('review_answers', {
  id,
  review_id: integer('review_id')
    .references(() => reviews.id)
    .notNull(),
  question_id: integer('question_id')
    .references(() => review_questions.id)
    .notNull(),
  responder_id: integer('responder_id')
    .references(() => users.id)
    .notNull(), // The employee who provides the answer
  answer_text: text('answer_text'),
  rating: integer('rating'),
  org_id,
  created_at,
});

// Enum for Feedback Request Status
const feedbackRequestStatusEnum = pgEnum('feedback_request_status', [
  'PENDING',
  'COMPLETED',
  'DECLINED',
]);

export const feedbacks = pgTable('feedbacks', {
  id,
  requester_id: integer('requester_id')
    .references(() => users.id)
    .notNull(),
  requested_to: integer('requested_to')
    .references(() => users.id)
    .notNull(),
  status: feedbackRequestStatusEnum('status').default('PENDING'), // 'pending', 'completed', 'declined'
  feedback_text: text('feedback_text'),
  org_id,
  created_at,
});
