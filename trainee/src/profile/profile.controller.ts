import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { diskStorage } from "multer";
import { LocalAuthGuard } from "src/auth/local-auth.guard";
import { User } from "src/user/schemas/user.schema";
import { updateUserDto } from "./dto/update-user.dto";
import { ProfileService } from "./profile.service";
import { extname } from "path";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { AvatarUploadDto } from "./dto/avatar-upload.dto";

@ApiTags("Profile")
@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Put(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update the user by id" })
  @ApiParam({
    name: "id",
    required: true,
    description: "Should be an id of a user that exists in the database",
    type: String,
  })
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

  @Post("upload")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Upload the user avatar photo" })
  @ApiBody({
    description: "Upload avatar photo",
    type: AvatarUploadDto,
  })
  @ApiOkResponse({
    description: "The user avatar was successfully uploaded",
    type: AvatarUploadDto,
  })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./files",
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Get(":imgpath")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get the user avatar photo" })
  @ApiParam({
    name: "imgpath",
    required: true,
    description:
      "Should be a path of a user avatar photo that exists in the database",
    type: String,
  })
  @ApiOkResponse({
    description: "The user with taken id was removed",
    type: AvatarUploadDto,
  })
  seeUploadedFile(@Param("imgpath") image, @Res() res) {
    return res.sendFile(image, { root: "uploads" });
  }
}
