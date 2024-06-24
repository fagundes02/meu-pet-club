import { Module } from '@nestjs/common';

import { UsersModule } from './users/user.module';
import { PlansModule } from './plans/plan.module';
import { PetsModule } from './pets/pet.module';


@Module({
  imports: [UsersModule, PlansModule, PetsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
