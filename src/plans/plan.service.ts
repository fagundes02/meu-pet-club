import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Plan } from './interfaces/plan.interface';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlanService {
  constructor(
    @Inject('PLAN_MODEL')
    private planModel: Model<Plan>,
  ) {}

  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
    const createdPlan = new this.planModel(createPlanDto);

    return createdPlan.save();
  }

  async update(updatePlanDto: UpdatePlanDto): Promise<Plan> {
    return this.planModel.findByIdAndUpdate(updatePlanDto.id, {
      $set: {
        ...updatePlanDto,
      },
    });
  }

  async remove(id: string) {
    return this.planModel.deleteOne({
      _id: id,
    });
  }

  async findAll(): Promise<Plan[]> {
    return this.planModel.find().exec();
  }
}