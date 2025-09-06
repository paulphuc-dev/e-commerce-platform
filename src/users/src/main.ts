import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions} from '@nestjs/microservices';
import { 
  PROFILE_PKG,
  PROFILE_PROTOPATH,
  PROFILE_URL
 } from './constant';
async function bootstrap() {
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: PROFILE_PKG,
      protoPath: join(__dirname, PROFILE_PROTOPATH),
      url: PROFILE_URL,
    },
  });
  await grpcApp.listen();
}
bootstrap();
