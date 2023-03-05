import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { HashService } from "src/user/hash.service";
import { AuthController } from "./auth.controller";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60d" },
    }),
  ],
  providers: [AuthService, LocalStrategy, HashService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
