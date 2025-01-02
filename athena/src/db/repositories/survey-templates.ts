import { eq } from 'drizzle-orm';
import { DB } from '../client';
import { survey_templates, SurveyTemplateInsert } from '../schema';
import { getFirst } from '@/utils/array';

export class SurveyTemplatesRepository {
  constructor(private readonly db: DB) {}

  async create(surveyTemplate: SurveyTemplateInsert) {
    return this.db.insert(survey_templates).values(surveyTemplate);
  }

  async getById(id: number) {
    return this.db
      .select()
      .from(survey_templates)
      .where(eq(survey_templates.id, id))
      .then(getFirst);
  }

  async getByTitle(title: string) {
    return this.db
      .select()
      .from(survey_templates)
      .where(eq(survey_templates.title, title))
      .then(getFirst);
  }

  async getAllByOrgId(orgId: number) {
    return this.db.select().from(survey_templates).where(eq(survey_templates.org_id, orgId));
  }
}
