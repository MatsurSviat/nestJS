import {
  Body,
  Controller,
  Delete,
  Param,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ApiOkResponse, ApiParam } from "@nestjs/swagger";
import { LocalAuthGuard } from "src/auth/local-auth.guard";
import { User } from "src/user/schemas/user.schema";
import { updateUserDto } from "./dto/update-user.dto";
import { ProfileService } from "./profile.service";

@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Delete(":id")
  // @UseGuards(LocalAuthGuard)
  @ApiParam({
    name: "id",
    required: true,
    description: "Should be an id of a user that exists in the database",
    type: String,
  })
  @ApiOkResponse({ description: "The user with taken id was removed" })
  deleteUser(@Param("id") id): Promise<User> {
    return this.profileService.removeUser(id);
  }

  @Put(":id")
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({
    description: "The user with taken id was updated",
    type: updateUserDto,
  })
  updateUser(
    @Body() updateUserDto: updateUserDto,
    @Param("id") id
  ): Promise<User> {
    return this.profileService.updateUser(id, updateUserDto);
  }
}
