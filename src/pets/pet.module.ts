import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database.module';
import { PetsController } from './pet.controller';
import { PetService } from './pet.service';
import { petsProviders } from './pet.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [PetsController],
  providers: [PetService, ...petsProviders],
})
export class PetsModule {}