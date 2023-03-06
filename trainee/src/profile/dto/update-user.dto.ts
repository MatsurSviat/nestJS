import { ApiProperty } from "@nestjs/swagger";

export class updateUserDto {
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
    description: "The user email",
    example: "willSmith@mail.com",
    required: true,
  })
  readonly username: string;

  @ApiProperty({
    description: "The user password",
    example: "password",
    required: true,
  })
  readonly password: string;
}
