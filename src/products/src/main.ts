import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions} from '@nestjs/microservices';
import { 
  PRODUCT_PKG,
  PRODUCT_PROTOPATH,
  PRODUCT_URL
 } from './constant';
async function bootstrap() {
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: PRODUCT_PKG,
      protoPath: join(__dirname, PRODUCT_PROTOPATH),
      url: PRODUCT_URL,
    },
  });
  await grpcApp.listen();
}
bootstrap();
