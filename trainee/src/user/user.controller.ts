import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  getSchemaPath,
} from "@nestjs/swagger";
import { LocalAuthGuard } from "src/auth/local-auth.guard";
import { createUserDto } from "./dto/create-user.dto";
import { updateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";
import { UserService } from "./user.service";

@ApiTags("User")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBody({ type: [createUserDto] })
  @ApiOkResponse({
    schema: {
      allOf: [
        {
          properties: {
            results: {
              type: "array",
              items: { $ref: getSchemaPath(User) },
            },
          },
        },
      ],
    },
  })
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(":id")
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
  getOneUser(@Param("id") id): Promise<User> {
    return this.userService.getOneUser(id);
  }

  @Get("useremail")
  @UseGuards(LocalAuthGuard)
  getUserByUserEmail(@Param() param) {
    return this.userService.getUserByUserEmail(param.email);
  }

  @Post("register")
  @ApiCreatedResponse({
    description: "The user has been successfully created.",
    type: User,
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  registerUser(@Body() createUserDto: createUserDto) {
    return this.userService.registerUser(createUserDto);
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

  @Put(":id")
  @ApiOkResponse({
    description: "The user with taken id was updated",
    type: User,
  })
  updateUser(
    @Body() updateUserDto: updateUserDto,
    @Param("id") id
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }
}
