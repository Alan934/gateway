import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_SERVICE, envs } from 'src/config';

@Module({
    controllers: [UserController],
    imports: [
        ClientsModule.register([
            {
                name: USERS_SERVICE,
                transport: Transport.TCP,
                options: {
                    host: envs.usersMicroserviceHost,
                    port: envs.usersMicroservicePort,
                },
            },
        ]),
    ],
})
export class UsersModule {}