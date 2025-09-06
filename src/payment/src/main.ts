import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { 
  PAYMENT_PKG,
  PAYMENT_PROTOPATH,
  PAYMENT_URL,
  NATS_SERVER
 } from './constant';
async function bootstrap() {
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: PAYMENT_PKG,
      protoPath: join(__dirname, PAYMENT_PROTOPATH),
      url: PAYMENT_URL,
    },
  });

  //NATS App
  const natsApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: [NATS_SERVER],
    },
  });

  await Promise.all([
    grpcApp.listen(),
    natsApp.listen()
  ]);
}
bootstrap();
