import { Body, Controller, Delete, Get, Param, Patch, Post, Inject, Query, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { USERS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetAllUsers } from './dto/getAll-users.dto';

@Controller('users')
export class UserController{

    constructor(
        @Inject(USERS_SERVICE) private readonly usersClient: ClientProxy,
    ) {}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto){
        return this.usersClient.send({ cmd: 'createUser' }, createUserDto ).toPromise();
    }

    @Get()
    findAllUsers(@Query() getAllUsers: GetAllUsers) {
        return this.usersClient.send({ cmd: 'findAllUsers' }, getAllUsers ).toPromise();
    }

    @Get(':id')
    async findOneUser(@Param('id') id: string){
        try {
            const user = await firstValueFrom(
                this.usersClient.send({ cmd: 'findOneUser' }, { id } )
            );
            return user;
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        try {
            const user = await firstValueFrom(
                this.usersClient.send({ cmd: 'removeUser' }, { id } )
            );
            return user;
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @Patch(':id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto
    ) {
        try {
            const user = await firstValueFrom(
                this.usersClient.send({ cmd: 'updateUser' }, { id, ...updateUserDto } )
            );

            if(!user) {
                throw new BadRequestException('User not found');
            }

            return user;
        } catch (error) {
            throw new RpcException(error);
        }
    }
}