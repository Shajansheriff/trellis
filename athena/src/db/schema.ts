import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  pgEnum,
  varchar,
  unique,
} from 'drizzle-orm/pg-core';

const id = serial('id').primaryKey();
const created_at = timestamp('created_at').defaultNow();
const updated_at = timestamp('updated_at');

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

export type UserInsert = typeof users.$inferInsert;
export type UserSelect = typeof users.$inferSelect;

const created_by = integer('created_by').references(() => users.id);

export const departments = pgTable('departments', {
  id,
  name: text('name').notNull(),
  org_id,
  created_at,
});

const invitationStatusEnum = pgEnum('invitation_status', ['PENDING', 'ACCEPTED', 'REJECTED']);
export const user_invites = pgTable(
  'user_invites',
  {
    id,
    email: varchar('email', { length: 100 }).notNull(),
    inviter_id: integer('inviter_id')
      .references(() => users.id)
      .notNull(),
    status: invitationStatusEnum('status').default('PENDING'),
    org_id,
    created_at,
    accepted_at: timestamp('accepted_at'),
    rejected_at: timestamp('rejected_at'),
  },
  (table) => {
    return {
      unique_email_per_org_per_status: unique().on(table.email, table.org_id, table.status),
    };
  },
);

const surveyStatusEnum = pgEnum('survey_status', ['DRAFT', 'PUBLISHED', 'ARCHIVED']);
export const survey_templates = pgTable(
  'survey_tpls',
  {
    id,
    title: varchar('title', { length: 100 }).notNull(),
    description: varchar('description', { length: 255 }),
    status: surveyStatusEnum('status').notNull().default('DRAFT'),
    created_by: created_by.notNull(),
    org_id,
    created_at: created_at.notNull(),
  },
  (table) => {
    return {
      unique_title_per_org: unique().on(table.title, table.org_id),
    };
  },
);

export type SurveyTemplateInsert = typeof survey_templates.$inferInsert;
export type SurveyTemplateSelect = typeof survey_templates.$inferSelect;

const questionTypeEnum = pgEnum('question_type', ['RATING', 'TEXT', 'RATING_AND_TEXT']);
export const question_templates = pgTable(
  'question_templates',
  {
    id,
    question_text: text('question_text').notNull(),
    question_type: questionTypeEnum('question_type').notNull().default('RATING'),
    instructions: text('instructions'),
    default_value: text('default_value'),
    required: boolean('required').default(false),
    org_id,
    created_at,
    created_by: created_by.notNull(),
  },
  (table) => {
    return {
      unique_question_text_per_org: unique().on(table.question_text, table.org_id),
    };
  },
);

export const survey_template_questions = pgTable(
  'survey_template_questions',
  {
    id,
    survey_template_id: integer('survey_template_id')
      .references(() => survey_templates.id)
      .notNull(),
    question_template_id: integer('question_template_id')
      .references(() => question_templates.id)
      .notNull(),
    created_at,
  },
  (table) => {
    return {
      unique_survey_template_id_question_template_id: unique().on(
        table.survey_template_id,
        table.question_template_id,
      ),
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
  org_id,
  created_at,
  created_by: created_by.notNull(),
});

export const survey_questions = pgTable('survey_questions', {
  id,
  survey_id: integer('survey_id')
    .references(() => surveys.id)
    .notNull(),
  question_template_id: integer('question_template_id')
    .references(() => question_templates.id)
    .notNull(),
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

const ratingEnum = pgEnum('rating', ['1', '2', '3', '4', '5']);

export const survey_answers = pgTable('survey_answers', {
  id,
  response_id: integer('response_id')
    .references(() => survey_responses.id)
    .notNull(),
  question_id: integer('question_id')
    .references(() => survey_questions.id)
    .notNull(),
  answer: text('answer'),
  rating: ratingEnum('rating'), // For ratings (e.g., 1-5)
  org_id,
  created_at,
});

export const reviews = pgTable('reviews', {
  id,
  employee_id: integer('employee_id')
    .references(() => users.id)
    .notNull(),
  title: varchar('title', { length: 100 }).notNull(),
  description: varchar('description', { length: 255 }),
  start_date: timestamp('start_date').notNull(),
  end_date: timestamp('end_date').notNull(),
  extended_end_date: timestamp('extended_end_date'),
  org_id,
  created_at,
});

const review_id = integer('review_id')
  .references(() => reviews.id)
  .notNull();

export const review_questions = pgTable('review_questions', {
  id,
  review_id,
  content: text('content').notNull(),
  question_type: questionTypeEnum('question_type').notNull().default('TEXT'),
  org_id,
  created_at,
});

export const review_answers = pgTable('review_answers', {
  id,
  review_id,
  question_id: integer('question_id')
    .references(() => review_questions.id)
    .notNull(),
  responder_id: integer('responder_id')
    .references(() => users.id)
    .notNull(), // The employee who provides the answer
  content: text('content'),
  rating: ratingEnum('rating'),
  org_id,
  created_at,
  updated_at,
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
  content: text('content'),
  org_id,
  created_at,
});
