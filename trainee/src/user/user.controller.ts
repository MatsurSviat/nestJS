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
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { createUserDto } from "./dto/create-user.dto";
import { Role } from "./role.enum";
import { Roles } from "./roles.decorator";
import { RolesGuard } from "./roles.guard";
import { User } from "./schemas/user.schema";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";
@ApiTags("User")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: "Get the list of all users" })
  @Roles(Role.Admin)
  @ApiOkResponse({ type: [createUserDto] })
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: "Get one user by id" })
  @Roles(Role.Admin)
  @ApiParam({
    name: "id",
    required: true,
    description: "Should be an id of a user that exists in the database",
    type: String,
  })
  @ApiOkResponse({
    description: "Get the user with taken id.",
    type: User,
  })
  getOneUser(@Param("id") id): Promise<UserEntity> {
    return this.userService.getOneUser(id);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: "Delete one user by id" })
  @Roles(Role.Admin)
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
  @ApiOperation({ summary: "Get the user by username" })
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
  @ApiOperation({ summary: "The user registration" })
  @ApiBody({
    description: "The user registration",
    type: UserEntity,
  })
  @ApiCreatedResponse({
    description: "The user has been successfully created.",
    type: UserEntity,
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  registerUser(@Body() createUserDto: createUserDto) {
    return this.userService.registerUser(createUserDto);
  }
}
