import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  findAll(): Promise<Order[]> {
    return this.orderModel.find().populate(['products']).exec();
  }

  findOne(id: string): Promise<Order> {
    return this.orderModel.findById(id).exec();
  }

  delete(id: string): void {
    this.orderModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }

  async update(id: string, data: UpdateQuery<OrderDocument>) {
    return this.orderModel
      .updateOne(
        {
          _id: id,
        },
        data,
        {
          new: true,
        },
      )
      .exec();
  }
}
