import { ApiProperty } from "@nestjs/swagger";

export class AvatarUploadDto {
  @ApiProperty({
    type: "string",
    format: "binary",
    example: "4f00573e6c9463bfa24df333f3297dfa",
  })
  file: any;
}
