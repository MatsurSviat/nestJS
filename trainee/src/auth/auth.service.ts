import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/schemas/user.schema";
import { HashService } from "src/user/hash.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private hashService: HashService
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.getUserByUserEmail(email);
    if (user && (await this.hashService.comparePassword(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      sub: user.firstName,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
