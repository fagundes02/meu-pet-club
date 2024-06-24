import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database.module';
import { PlansController } from './plan.controller';
import { PlanService } from './plan.service';
import { plansProviders } from './plan.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [PlansController],
  providers: [PlanService, ...plansProviders],
})
export class PlansModule {}