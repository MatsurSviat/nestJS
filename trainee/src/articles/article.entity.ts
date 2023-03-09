import { ApiProperty } from "@nestjs/swagger";

export class ArticleEntity {
  @ApiProperty({
    description: "The article id",
    example: "6409d3a87ba1325fc0a3da18",
  })
  readonly _id: string;

  @ApiProperty({
    description: "The article title",
    example: "title",
  })
  title: string;

  @ApiProperty({
    description: "The article author",
    example: "Don Perinion",
  })
  author: string;

  @ApiProperty({
    description: "The article content",
    example: "content",
  })
  content: string;
}
