import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from '@app/product/schemas/product.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  _id: mongoose.Types.ObjectId;

  @Prop()
  total: number;

  @Prop({ index: true })
  user: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  products: Product[];
}

const OrderSchema = SchemaFactory.createForClass(Order);

export { OrderSchema };
