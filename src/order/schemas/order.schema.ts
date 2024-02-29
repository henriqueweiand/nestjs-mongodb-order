import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  _id: mongoose.Types.ObjectId;

  @Prop()
  total: number;

  @Prop()
  user: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
