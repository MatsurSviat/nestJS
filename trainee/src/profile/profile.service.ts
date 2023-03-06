import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, userDocument } from "src/user/schemas/user.schema";
import { updateUserDto } from "./dto/update-user.dto";

@Injectable()
export class ProfileService {
  constructor(@InjectModel(User.name) private UserModel: Model<userDocument>) {}

  async removeUser(id: string): Promise<User> {
    return this.UserModel.findByIdAndRemove(id);
  }

  async updateUser(id: string, updateUserDto: updateUserDto): Promise<User> {
    return this.UserModel.findByIdAndUpdate(id, updateUserDto)
      .setOptions({
        overwrite: true,
        new: true,
      })
      .populate("firstName")
      .populate("lastName");
  }
}
