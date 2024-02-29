import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  _id: mongoose.Types.ObjectId;

  @Prop({ index: true })
  name: string;
}

const ProductSchema = SchemaFactory.createForClass(Product);

export { ProductSchema };
