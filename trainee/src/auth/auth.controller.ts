import { Controller, Post, UseGuards, Request } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
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
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
