import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getOneUser(@Param('id') id): Promise<User> {
    return this.userService.getOneUser(id);
  }

  @Post()
  createUser(@Body() createUserDto: createUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id): Promise<User> {
    return this.userService.removeUser(id);
  }

  @Put(':id')
  updateUser(
    @Body() updateUserDto: updateUserDto,
    @Param('id') id,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }
}
