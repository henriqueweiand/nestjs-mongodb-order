import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { UserService } from '@app/user/user.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private userService: UserService,
  ) {}

  async create({ total, products, user }): Promise<Order> {
    const createdOrder = new this.orderModel({ total, products, user });
    const savedOrder = await createdOrder.save();

    await this.userService.pushOrder(user, savedOrder._id);

    return savedOrder;
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
