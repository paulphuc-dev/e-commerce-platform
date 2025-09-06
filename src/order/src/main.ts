import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { 
  ORDER_PKG,
  ORDER_PROTOPATH,
  ORDER_URL,
  ORDER_RMQ_URL,
  ORDER_QUEUE
} from './constant';
async function bootstrap() {
  //Grpc App
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: ORDER_PKG,
      protoPath: join(__dirname, ORDER_PROTOPATH),
      url: ORDER_URL,
    },
  });

  //RabitApp
  const rmqApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [ORDER_RMQ_URL], 
      queue: ORDER_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });


  // Start all microservices
  await Promise.all([
    grpcApp.listen(),
    rmqApp.listen()
  ]);
}
bootstrap();
