import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginationQueryDto } from '@app/core/common/dto/pagination-query.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  findAll(paginationQuery: PaginationQueryDto): Promise<Product[]> {
    const { limit, offset } = paginationQuery;

    return this.productModel.find().skip(offset).limit(limit).exec();
  }

  findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  delete(id: string): void {
    this.productModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }

  async update(id: string, data: UpdateQuery<ProductDocument>) {
    return this.productModel
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
