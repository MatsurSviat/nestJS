import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ versionKey: false })
export class Article {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  content: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
