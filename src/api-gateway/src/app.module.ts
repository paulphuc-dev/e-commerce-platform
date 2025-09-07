import { Module} from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { OrdersModule } from './modules/order/orders.module';
import { PaymentsModule } from './modules/payment/payments.module';
import { ProductsModule } from './modules/products/products.module'
import { ProfileModule } from './modules/profile/profile.module';
import { CartModule } from './modules/cart/cart.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServiceLauncherService } from './service-launcher.service';
@Module({
  imports: [
    AuthModule,
    OrdersModule,
    PaymentsModule,
    ProductsModule,
    ProfileModule,
    CartModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60, 
        limit: 555, 
      },
    ]),
  ],  
  providers: [ServiceLauncherService],
})
export class AppModule {
  constructor() {
    console.log('✅ Api Gateway Module loaded !');
  }
}
