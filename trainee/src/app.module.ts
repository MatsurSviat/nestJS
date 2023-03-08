import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ProfileModule } from "./profile/profile.module";
import { MulterModule } from "@nestjs/platform-express";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./user/roles.guard";

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(`mongodb://localhost/nest`),
    ProfileModule,
    MulterModule.register({
      dest: "./uploads",
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
