import { ApiProperty } from "@nestjs/swagger";

export class User {
  @ApiProperty()
  username: string;
  firstName?: string | null;
  @ApiProperty({ required: false, nullable: true })
  password: string;
  lastName?: string | null;
}
