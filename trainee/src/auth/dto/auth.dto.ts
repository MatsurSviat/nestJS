import { ApiProperty } from "@nestjs/swagger";

export class LoginResDto {
  @ApiProperty({
    description: "The access token",
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDA0ZjE1YjQwMDNiOGI4MGY5ZmZkZjciLCJpYXQiOjE2NzgwNDU1MzksImV4cCI6MTY4MzIyOTUzOX0.lm-ZlTgZfgEqypxZGOotlgShm9-36K2cqNILPRLKNBc",
  })
  accessToken: string;
}
