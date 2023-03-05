import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { createUserDto } from "./dto/create-user.dto";
import { updateUserDto } from "./dto/update-user.dto";
import { HashService } from "./hash.service";
import { User, userDocument } from "./schemas/user.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<userDocument>,
    private hashService: HashService
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.UserModel.find().exec();
  }

  async getOneUser(id: string): Promise<User> {
    return this.UserModel.findById(id);
  }

  async getUserByUsername(username: string) {
    return this.UserModel.findOne({
      username,
    }).exec();
  }

  async removeUser(id: string): Promise<User> {
    return this.UserModel.findByIdAndRemove(id);
  }

  async updateUser(id: string, userDto: updateUserDto): Promise<User> {
    return this.UserModel.findByIdAndUpdate(id, userDto, { new: true });
  }

  async registerUser(createUserDto: createUserDto): Promise<User> {
    const createUser = new this.UserModel(createUserDto);
    const user = await this.getUserByUsername(createUser.username);
    if (user) {
      throw new BadRequestException();
    }
    createUser.password = await this.hashService.hashPassword(
      createUser.password
    );

    return createUser.save();
  }
}
