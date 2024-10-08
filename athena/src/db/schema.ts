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
} from 'drizzle-orm/pg-core';

const created_at = timestamp('created_at').defaultNow();

export const organizations = pgTable('organizations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  created_at,
});

const user_status_enum = pgEnum('user_status', ['active', 'inactive']);
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  organization_id: integer('organization_id')
    .references(() => organizations.id)
    .notNull(),
  status: user_status_enum('status').default('active'),
  job_title: varchar('job_title', { length: 100 }),
  deleted_at: timestamp('deleted_at'),
  created_at,
});

export const departments = pgTable('departments', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  organization_id: integer('organization_id')
    .references(() => organizations.id)
    .notNull(),
  created_at,
});

export const invitations = pgTable('invitations', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  organization_id: integer('organization_id')
    .references(() => organizations.id)
    .notNull(),
  inviter_id: integer('inviter_id')
    .references(() => users.id)
    .notNull(),
  accepted: boolean('accepted').default(false),
  created_at,
});

export const survey_templates = pgTable('survey_templates', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  organization_id: integer('organization_id')
    .references(() => organizations.id)
    .notNull(),
  created_at,
});

const surveyStatusEnum = pgEnum('survey_status', ['draft', 'active', 'completed']);

export const surveys = pgTable('surveys', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  organization_id: integer('organization_id')
    .references(() => organizations.id)
    .notNull(),
  template_id: integer('template_id').references(() => survey_templates.id),
  created_by: integer('created_by')
    .references(() => users.id)
    .notNull(),
  start_date: timestamp('start_date').notNull(),
  end_date: timestamp('end_date').notNull(),
  status: surveyStatusEnum('status').default('draft'),
  created_at,
});

const surveyQuestionTypeEnum = pgEnum('survey_question_type', [
  'text',
  'rating',
  'multiple_choice',
]);

export const survey_template_questions = pgTable('survey_template_questions', {
  id: serial('id').primaryKey(),
  survey_template_id: integer('survey_template_id')
    .references(() => survey_templates.id)
    .notNull(),
  question_text: text('question_text').notNull(),
  question_type: surveyQuestionTypeEnum('question_type').notNull(),
  required: boolean('required').default(false),
  options: json('options'), // for multiple choice questions
  created_at,
});

export const survey_questions = pgTable('survey_questions', {
  id: serial('id').primaryKey(),
  survey_id: integer('survey_id')
    .references(() => surveys.id)
    .notNull(),
  question_text: text('question_text').notNull(),
  question_type: surveyQuestionTypeEnum('question_type').notNull(),
  question_template_id: integer('question_template_id').references(
    () => survey_template_questions.id,
  ),
  required: boolean('required').default(false),
  options: json('options'), // for multiple choice questions
  created_at,
});

export const survey_responses = pgTable('survey_responses', {
  id: serial('id').primaryKey(),
  survey_id: integer('survey_id')
    .references(() => surveys.id)
    .notNull(),
  employee_id: integer('employee_id')
    .references(() => users.id)
    .notNull(),
  created_at,
});

export const survey_answers = pgTable('survey_answers', {
  id: serial('id').primaryKey(),
  response_id: integer('response_id')
    .references(() => survey_responses.id)
    .notNull(),
  question_id: integer('question_id')
    .references(() => survey_questions.id)
    .notNull(),
  answer_text: text('answer_text'),
  rating: integer('rating'), // For ratings (e.g., 1-5)
  created_at,
});

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  employee_id: integer('employee_id')
    .references(() => users.id)
    .notNull(),
  start_date: timestamp('start_date').notNull(),
  end_date: timestamp('end_date').notNull(),
  extended_end_date: timestamp('extended_end_date'),
  created_at,
});

// Enum for Review Question Types
const reviewQuestionTypeEnum = pgEnum('review_question_type', ['text', 'rating']);
export const review_questions = pgTable('review_questions', {
  id: serial('id').primaryKey(),
  review_id: integer('review_id')
    .references(() => reviews.id)
    .notNull(),
  question_text: text('question_text').notNull(),
  question_type: reviewQuestionTypeEnum('question_type').notNull(), // 'text', 'rating'
  created_at,
});

export const review_answers = pgTable('review_answers', {
  id: serial('id').primaryKey(),
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
  created_at,
});

// Enum for Feedback Request Status
const feedbackRequestStatusEnum = pgEnum('feedback_request_status', [
  'pending',
  'completed',
  'declined',
]);

export const feedbacks = pgTable('feedbacks', {
  id: serial('id').primaryKey(),
  requester_id: integer('requester_id')
    .references(() => users.id)
    .notNull(),
  requested_to: integer('requested_to')
    .references(() => users.id)
    .notNull(),
  status: feedbackRequestStatusEnum('status').default('pending'), // 'pending', 'completed', 'declined'
  feedback_text: text('feedback_text'),
  created_at,
});
