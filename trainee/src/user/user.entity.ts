import { ApiProperty } from "@nestjs/swagger";

export class UserEntity {
  @ApiProperty({
    description: "The user name / email",
    example: "newUser@gmail.com",
  })
  username: string;
  @ApiProperty({
    description: "The user password",
    example: "password",
  })
  password: string;
  @ApiProperty({
    description: "The user role",
    example: "admin",
  })
  roles: Array<string>;
}
