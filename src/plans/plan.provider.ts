import { Connection } from 'mongoose';
import { PlanSchema } from './plan.schema';

export const plansProviders = [
  {
    provide: 'PLAN_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Plan', PlanSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];