import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { JWT_PASS, UsersService } from './user.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import * as jwt from 'jsonwebtoken';
  
  @Controller('/user')
  export class UsersController {
    constructor(private readonly userService: UsersService) {}
  
    @Get()
    list() {
      return this.userService.findAll();
    }
  
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      return this.userService.create({ ...createUserDto, role: 'ADMIN' });
    }
  
    @Post('client')
    createClient(@Body() createUserDto: CreateUserDto) {
      return this.userService.create({ ...createUserDto, role: 'CLIENT' });
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.userService.update(updateUserDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.userService.remove(id);
    }
  
    @Post('auth')
    async authenticate(@Body() auth: { email: string; password: string }) {
      const user = await this.userService.authenticate(auth.email, auth.password);
      if (!user) throw Error('Invalid Credentials');
      return jwt.sign(user.toJSON(), JWT_PASS);
    }
  }
  