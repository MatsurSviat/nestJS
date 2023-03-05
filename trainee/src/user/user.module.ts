import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthService } from "src/auth/auth.service";
import { jwtConstants } from "src/auth/constants";
import { JwtStrategy } from "src/auth/jwt.strategy";
import { LocalStrategy } from "src/auth/local.strategy";
import { HashService } from "./hash.service";
import { User, UserSchema } from "./schemas/user.schema";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60d" },
    }),
  ],
  providers: [
    UserService,
    HashService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
