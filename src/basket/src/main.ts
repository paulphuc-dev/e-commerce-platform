import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions} from '@nestjs/microservices';
import { 
  CART_PKG,
  CART_PROTOPATH,
  CART_URL
 } from './constant';
async function bootstrap() {
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: CART_PKG,
      protoPath: join(__dirname, CART_PROTOPATH),
      url: CART_URL,
    },
  });
  await grpcApp.listen();
}
bootstrap();
