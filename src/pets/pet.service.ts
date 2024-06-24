import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Pet } from './interfaces/pet.interface';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet-dto';

@Injectable()
export class PetService {
  constructor(
    @Inject('PET_MODEL')
    private petModel: Model<Pet>,
  ) {}

  async create(createPetDto: CreatePetDto): Promise<Pet> {
    const createdPet = new this.petModel(createPetDto);

    return createdPet.save();
  }

  async update(updatePetDto: UpdatePetDto): Promise<Pet> {
    return this.petModel.findByIdAndUpdate(updatePetDto.id, {
      $set: {
        ...updatePetDto,
      },
    });
  }
S
  async remove(id: string) {
    return this.petModel.deleteOne({
      _id: id,
    });
  }

  async findAll(): Promise<Pet[]> {
    return this.petModel.find().exec();
  }
}
