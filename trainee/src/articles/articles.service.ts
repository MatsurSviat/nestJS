import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Article, ArticleDocument } from "./schemas/articles.schema";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>
  ) {}

  async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }

  async getAllArticles(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async getOneArticle(articleId: string): Promise<Article> {
    return this.articleModel.findById(articleId);
  }

  async updateArticle(
    userId: string,
    articleId: string,
    updateArticleDto: UpdateArticleDto
  ): Promise<UpdateArticleDto> {
    const article = await this.articleModel.findOne({
      id: articleId,
      author: userId,
    });
    if (!article) throw new ForbiddenException("You cannot edit the article");

    return this.articleModel.findByIdAndUpdate(articleId, updateArticleDto);
  }

  async removeArticle(articleId: string) {
    return this.articleModel.findByIdAndRemove(articleId);
  }
}
