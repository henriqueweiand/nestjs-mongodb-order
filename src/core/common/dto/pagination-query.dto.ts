import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty({
    required: false,
    default: 10,
  })
  @Transform(({ value }) => parseInt(value))
  limit: number = 10;

  @IsOptional()
  @ApiProperty({
    required: false,
    default: 0,
  })
  @Transform(({ value }) => parseInt(value))
  offset: number = 0;
}
