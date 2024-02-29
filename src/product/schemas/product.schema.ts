import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  _id: mongoose.Types.ObjectId;

  @Prop()
  name: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
