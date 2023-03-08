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
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { LocalAuthGuard } from "src/auth/local-auth.guard";
import { User } from "src/user/schemas/user.schema";
import { updateUserDto } from "./dto/update-user.dto";
import { ProfileService } from "./profile.service";
import { extname } from "path";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@ApiTags("Profile")
@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Put(":id")
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  seeUploadedFile(@Param("imgpath") image, @Res() res) {
    return res.sendFile(image, { root: "uploads" });
  }
}
