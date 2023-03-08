import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/user/schemas/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";
import { UserService } from "src/user/user.service";
import { AuthService } from "src/auth/auth.service";
import { HashService } from "src/user/hash.service";
import { LocalStrategy } from "src/auth/local.strategy";
import { JwtStrategy } from "src/auth/jwt.strategy";
import { MulterModule } from "@nestjs/platform-express";
import { RolesGuard } from "src/user/roles.guard";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    MulterModule.register({
      dest: "./uploads",
    }),
  ],
  providers: [
    ProfileService,
    UserService,
    HashService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RolesGuard,
  ],
  controllers: [ProfileController],
})
export class ProfileModule {}
