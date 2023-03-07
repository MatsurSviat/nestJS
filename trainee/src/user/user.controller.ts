import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { LocalAuthGuard } from "src/auth/local-auth.guard";
import { createUserDto } from "./dto/create-user.dto";
import { User } from "./schemas/user.schema";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@ApiTags("User")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBody({ type: [UserEntity] })
  @ApiOkResponse({ type: [UserEntity] })
  getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUsers();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: "id",
    required: true,
    description: "Should be an id of a user that exists in the database",
    type: String,
  })
  @ApiOkResponse({
    description: "Get the user with taken id.",
    type: UserEntity,
  })
  getOneUser(@Param("id") id): Promise<UserEntity> {
    return this.userService.getOneUser(id);
  }

  @Delete(":id")
  @ApiParam({
    name: "id",
    required: true,
    description: "Should be an id of a user that exists in the database",
    type: String,
  })
  @ApiOkResponse({ description: "The user with taken id was removed" })
  deleteUser(@Param("id") id): Promise<User> {
    return this.userService.removeUser(id);
  }

  @Get("username")
  @ApiParam({
    name: "username",
    required: true,
    description: "Should be an username that exists in the database",
    type: String,
  })
  @ApiOkResponse({
    description: "Get the username",
    type: UserEntity,
  })
  getUserByUsername(@Param("username") username) {
    return this.userService.getUserByUsername(username);
  }

  @Post("register")
  @ApiBody({ type: [UserEntity] })
  @ApiCreatedResponse({
    description: "The user has been successfully created.",
    type: UserEntity,
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  registerUser(@Body() createUserDto: createUserDto) {
    return this.userService.registerUser(createUserDto);
  }
}
