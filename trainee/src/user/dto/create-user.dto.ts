import { ApiProperty } from "@nestjs/swagger";

export class createUserDto {

  @ApiProperty({
    description: "The user first name",
    example: "Will",
  })
  readonly firstName: string;

  @ApiProperty({
    description: "The user last name",
    example: "Smith",
  })
  readonly lastName: string;

  @ApiProperty({
    description: "The user email",
    example: "willSmith@mail.com",
  })
  readonly email: string;

  @ApiProperty({
    description: "The user password",
    example: "secredPassword",
  })
  readonly password: string;
}
