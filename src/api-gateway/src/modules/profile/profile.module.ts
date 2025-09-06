import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { 
  PROFILE_NAME,
  PROFILE_PKG,
  PROFILE_URL,
  PROFILE_PROTOPATH,
  PROFILE_PROTO,
  PROFILE_PROTOBUF
 } from './constants';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: PROFILE_NAME,
        transport: Transport.GRPC,
        options: {
          package: PROFILE_PKG,
          protoPath: join(__dirname, PROFILE_PROTOPATH),
          loader: {
            includeDirs: [
              join(__dirname, PROFILE_PROTO), // Thư mục chứa order.proto
              join(__dirname, PROFILE_PROTOBUF), // <-- thư viện chứa google/protobuf/*.proto
            ],
          },
          url: PROFILE_URL
        },
      },
    ]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
