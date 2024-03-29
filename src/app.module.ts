import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './core/database/database.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AuthModule } from './core/auth/auth.module';
import { AuditOrdersMiddleware } from '@app/core/middleware/audit-orders.middleware';

@Module({
    imports: [
        DevtoolsModule.register({
            http: process.env.NODE_ENV !== 'production',
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath:
                process.env.NODE_ENV == 'test' ? '.env.example' : '.env',
        }),
        AuthModule,
        DatabaseModule,
        UserModule,
        OrderModule,
        ProductModule,
    ],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuditOrdersMiddleware).forRoutes('order');
    }
}
