import { ApiProperty } from "@nestjs/swagger";

export class UpdateArticleDto {
  @ApiProperty({
    description: "The article id",
    example: "6409d3a87ba1325fc0a3da18",
  })
  readonly _id: string;

  @ApiProperty({
    description: "The article title",
    example: "Open speech",
  })
  readonly title: string;

  @ApiProperty({
    description: "The article author",
    example: "Will Smith",
  })
  readonly author: string;

  @ApiProperty({
    description: "The user name",
    example: "Here must be the article content",
  })
  readonly content: string;
}
