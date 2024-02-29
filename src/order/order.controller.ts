import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@app/core/auth/auth.guard';

@Controller('order')
@ApiTags('order')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    return this.orderService.create({ ...createOrderDto, user: req.user.id });
  }

  @Get('')
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.orderService.delete(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, {
      $set: updateOrderDto,
    });
  }
}
