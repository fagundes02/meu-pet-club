import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
  } from '@nestjs/common';
  
  import { AdminGuard } from 'src/admin.guard';
  import { PlanService } from './plan.service';
  import { AuthGuard } from 'src/auth.guard';
  import { CreatePlanDto } from './dto/create-plan.dto';
  import { UpdatePlanDto } from './dto/update-plan.dto';
  
  const adminGuard = new AdminGuard();
  const authGuard = new AuthGuard();
  
  @Controller('/plan')
  export class PlansController {
    constructor(private readonly planService: PlanService) {}
  
    @Get()
    @UseGuards(authGuard)
    list() {
      return this.planService.findAll();
    }
  
    @Post()
    @UseGuards(adminGuard)
    create(@Body() createPlanDto: CreatePlanDto) {
      return this.planService.create(createPlanDto);
    }
  
    @Put(':id')
    @UseGuards(adminGuard)
    update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
      return this.planService.update(updatePlanDto);
    }
  
    @Delete(':id')
    @UseGuards(adminGuard)
    remove(@Param('id') id: string) {
      return this.planService.remove(id);
    }
  }