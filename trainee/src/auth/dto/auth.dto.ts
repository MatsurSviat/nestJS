import { ApiProperty } from "@nestjs/swagger";

export class AuthResDto {
  @ApiProperty({
    description: "The user name",
    example: "newUser@mail.com",
  })
  username: string;

  @ApiProperty({
    description: "The user password",
    example: "password",
  })
  password: string;

  @ApiProperty({
    description: "The user role",
    example: "user",
  })
  roles: string;
}
