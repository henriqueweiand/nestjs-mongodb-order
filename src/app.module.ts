import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    OrderModule,
    OrderModule,
  ],
  providers: [AppService],
})
export class AppModule {}
