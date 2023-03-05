import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type userDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User {
  @ApiProperty({
    description: "The user first name",
    example: "Will",
  })
  @Prop()
  firstName: string;

  @ApiProperty({
    description: "The user last name",
    example: "Smith",
  })
  @Prop()
  lastName: string;

  @ApiProperty({
    description: "The user email",
    example: "willSmith@mail.com",
  })
  @Prop()
  email: string;

  @ApiProperty({
    description: "The user password",
    example: "secredPassword",
  })
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
