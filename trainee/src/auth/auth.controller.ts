import { Controller, Post, UseGuards, Request, Body } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthResDto } from "./dto/auth.dto";
import { LoginResDto } from "./dto/login.dto";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags("Auth")
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  @ApiBody({ type: AuthResDto })
  @ApiOkResponse({
    description: "Get the username",
    type: LoginResDto,
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
