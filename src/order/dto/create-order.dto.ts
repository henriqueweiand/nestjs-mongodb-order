import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly total: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly user: string;
}
