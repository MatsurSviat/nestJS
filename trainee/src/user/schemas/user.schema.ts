import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";
import { Role } from "../role.enum";

export type userDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User {
  @ApiProperty({
    description: "The user first name",
    example: "Will",
    required: false,
  })
  @Prop()
  firstName: string;

  @ApiProperty({
    description: "The user last name",
    example: "Smith",
    required: false,
  })
  @Prop()
  lastName: string;

  @ApiProperty({
    description: "The user name",
    example: "willSmith@mail.com",
  })
  @Prop()
  username: string;

  @ApiProperty({
    description: "The user password",
    example: "password",
  })
  @Prop()
  password: string;

  @ApiProperty({
    description: "The user role",
    example: "user / admin",
  })
  @Prop()
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
