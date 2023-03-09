import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { ArticlesService } from "./articles.service";
import { createArticleDto } from "./dto/create-article.dto";
import { Article } from "./schemas/articles.schema";
import { updateArticleDto } from "./dto/update-article.dto";
import { ArticleEntity } from "./article.entity";

@ApiTags("Article")
@Controller("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post("create")
  @ApiOperation({ summary: "Create an article" })
  @ApiCreatedResponse({
    description: "The article has been successfully created.",
    type: createArticleDto,
  })
  createArticle(@Body() createArticleDto: createArticleDto) {
    return this.articlesService.createArticle(createArticleDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all articles" })
  @ApiOkResponse({ type: [createArticleDto] })
  getAllArticles(): Promise<Article[]> {
    return this.articlesService.getAllArticles();
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
    return this.articlesService.getOneArticle(id);
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
    @Param("id") id: string,
    @Body() updateArticleDto: updateArticleDto
  ) {
    return this.articlesService.updateArticle(id, updateArticleDto);
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
    return this.articlesService.removeArticle(id);
  }
}
