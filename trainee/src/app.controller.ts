import { Controller, Post, UseGuards, Request } from "@nestjs/common";
import { AppService } from "./app.service";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthService } from "./auth/auth.service";

@Controller()
export class AppController {
  constructor() {}
}
