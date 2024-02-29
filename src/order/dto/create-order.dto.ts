import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import mongoose from 'mongoose';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly total: number;

  @IsNotEmpty()
  @ApiProperty({
    isArray: true,
    type: 'string',
  })
  @Transform(({ value }) =>
    value.map((item) => new mongoose.Types.ObjectId(item)),
  )
  readonly products: mongoose.Types.ObjectId[];
}
