import { ApiProperty } from "@nestjs/swagger";

export class createUserDto {
  @ApiProperty({
    description: "The user first name",
    example: "Will",
    required: false,
  })
  readonly firstName: string | null;

  @ApiProperty({
    description: "The user last name",
    example: "Smith",
    required: false,
  })
  readonly lastName: string | null;

  @ApiProperty({
    description: "The user name",
    example: "willSmith@mail.com",
  })
  readonly username: string;

  @ApiProperty({
    description: "The user password",
    example: "password",
  })
  readonly password: string;
}
