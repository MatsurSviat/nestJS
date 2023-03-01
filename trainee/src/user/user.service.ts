import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { User, userDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModal: Model<userDocument>) {}

  async getAllUsers(): Promise<User[]> {
    return this.UserModal.find().exec();
  }

  async getOneUser(id): Promise<User> {
    return this.UserModal.findById(id);
  }

  async createUser(userDto: createUserDto): Promise<User> {
    const newUser = new this.UserModal(userDto);
    return newUser.save();
  }

  async removeUser(id): Promise<User> {
    return this.UserModal.findByIdAndRemove(id);
  }

  async updateUser(id, userDto: updateUserDto): Promise<User> {
    return this.UserModal.findByIdAndUpdate(id, userDto, { new: true });
  }
}
