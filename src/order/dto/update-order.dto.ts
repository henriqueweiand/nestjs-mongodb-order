import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import mongoose from 'mongoose';

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly total: number;

  @Exclude()
  readonly user: string;

  @IsOptional()
  @ApiProperty({
    isArray: true,
    type: 'string',
  })
  @Transform(({ value }) =>
    value.map((item) => new mongoose.Types.ObjectId(item)),
  )
  readonly products: mongoose.Types.ObjectId[];
}
