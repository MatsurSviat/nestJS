import { Controller, Post, UseGuards, Request, Body } from "@nestjs/common";
import { ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginResDto } from "./dto/auth.dto";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags("Auth")
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  @ApiParam({
    name: "payload",
    required: true,
  })
  @ApiOkResponse({
    description: "Get the username",
    type: LoginResDto,
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
