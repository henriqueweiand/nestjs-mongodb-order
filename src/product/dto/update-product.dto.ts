import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @ApiProperty()
  readonly name: string;
}
