import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly total: number;

  @IsOptional()
  @ApiProperty()
  readonly user: string;
}
