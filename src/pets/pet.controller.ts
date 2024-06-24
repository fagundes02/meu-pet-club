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
  
  import { PetService } from './pet.service';
  import { CreatePetDto } from './dto/create-pet.dto';
  import { UpdatePetDto } from './dto/update-pet-dto';
  

  @Controller('/pet')
  export class PetsController {
    constructor(private readonly petService: PetService) {}
  
    @Get()
    list() {
      return this.petService.findAll();
    }
  
    @Post()
   
    create(@Body() createPetDto: CreatePetDto) {
      return this.petService.create(createPetDto);
    }
  
    @Put(':id')
   
    update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
      return this.petService.update(updatePetDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.petService.remove(id);
    }
  }
  