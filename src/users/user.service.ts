import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'npm i bcrypt';

export const JWT_PASS = '123456';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    createdUser.password = bcrypt.hashSync(createUserDto.password, 10);
    return createdUser.save();
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(updateUserDto.id, {
      $set: {
        ...updateUserDto,
      },
    });
  }

  async remove(id: string) {
    return this.userModel.deleteOne({
      _id: id,
    });
  }

  async findAll(): Promise<User[]> {
    return this.userModel
      .find(
        {},
        {
          password: false,
        },
      )
      .exec();
  }

  async authenticate(email: string, password: string) {
    const user = await this.userModel.findOne({
      email: email,
    });

    if (bcrypt.compareSync(password, user.password)) {
      return user;
    }

    return null;
  }
}
