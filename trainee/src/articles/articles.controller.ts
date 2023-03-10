import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { Article } from "./schemas/articles.schema";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { ArticleEntity } from "./article.entity";

@ApiTags("Article")
@Controller("articles")
export class ArticlesController {
  constructor(private readonly ArticlesService: ArticlesService) {}

  @Post("create")
  @ApiOperation({ summary: "Create an article" })
  @ApiCreatedResponse({
    description: "The article has been successfully created.",
    type: CreateArticleDto,
  })
  createArticle(@Body() CreateArticleDto: CreateArticleDto) {
    return this.ArticlesService.createArticle(CreateArticleDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all articles" })
  @ApiOkResponse({ type: [CreateArticleDto] })
  getAllArticles(): Promise<Article[]> {
    return this.ArticlesService.getAllArticles();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get the article by taken id" })
  @ApiParam({
    name: "id",
    required: true,
    description: "Should be an id of an article that exists in the database",
    type: String,
  })
  @ApiOkResponse({
    description: "Get the article with taken id.",
    type: ArticleEntity,
  })
  getOneArticle(@Param("id") id: string) {
    return this.ArticlesService.getOneArticle(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update the article by taken id" })
  @ApiParam({
    name: "id",
    required: true,
    description: "Should be an id of an article that exists in the database",
    type: String,
  })
  @ApiOkResponse({
    description: "Update the article with taken id.",
    type: ArticleEntity,
  })
  updateArticle(
    @Req() req: any,
    @Param("id") articleId: string,
    @Body() UpdateArticleDto: UpdateArticleDto
  ) {
    return this.ArticlesService.updateArticle(
      req.user.id,
      articleId,
      UpdateArticleDto
    );
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remove the article by taken id" })
  @ApiParam({
    name: "id",
    required: true,
    description: "Should be an id of an article that exists in the database",
    type: String,
  })
  @ApiOkResponse({
    description: "Remove the article with taken id.",
    type: ArticleEntity,
  })
  @ApiOperation({ summary: "Delete the article by taken id" })
  remove(@Param("id") id: string) {
    return this.ArticlesService.removeArticle(id);
  }
}
