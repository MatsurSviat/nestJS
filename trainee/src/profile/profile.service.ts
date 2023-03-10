import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, userDocument } from "src/user/schemas/user.schema";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class ProfileService {
  constructor(@InjectModel(User.name) private UserModel: Model<userDocument>) {}

  async updateUser(id: string, UpdateUserDto: UpdateUserDto): Promise<User> {
    return this.UserModel.findByIdAndUpdate(id, UpdateUserDto).setOptions({
      new: true,
    });
  }
}
