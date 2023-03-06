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

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.userService.getUserByUsername(username);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
