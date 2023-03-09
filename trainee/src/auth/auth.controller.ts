import { Controller, Post, UseGuards, Request, Body } from "@nestjs/common";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthResDto } from "./dto/auth.dto";
import { LoginResDto } from "./dto/login.dto";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags("Auth")
  @ApiOperation({ summary: "The user log in" })
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  @ApiBody({
    description:
      "The user can login with (username or email) + password and his role. Username field can be either the User`s username or email. The return value is an access token value. The token is valid for 60 days ",
    type: AuthResDto,
  })
  @ApiOkResponse({
    description: "Get the access token",
    type: LoginResDto,
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
