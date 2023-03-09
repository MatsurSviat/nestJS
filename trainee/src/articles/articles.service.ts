import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Article, ArticleDocument } from "./schemas/articles.schema";
import { createArticleDto } from "./dto/create-article.dto";
import { updateArticleDto } from "./dto/update-article.dto";

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>
  ) {}

  async createArticle(createArticleDto: createArticleDto): Promise<Article> {
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }

  async getAllArticles(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async getOneArticle(id: string): Promise<Article> {
    return this.articleModel.findById(id);
  }

  async updateArticle(
    id: string,
    updateArticleDto: updateArticleDto
  ): Promise<updateArticleDto> {
    return this.articleModel.findByIdAndUpdate(id, updateArticleDto);
  }

  async removeArticle(id: string) {
    return this.articleModel.findByIdAndRemove(id);
  }
}
