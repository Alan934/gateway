import { Min, IsString, IsEmail, IsStrongPassword } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
    @IsString()
    @IsEmail()
    public email: string;

    @IsString()
    //@IsStrongPassword()
    //@Min(6)
    public password: string;

    @IsString()
    public nombre: string;

    @IsString()
    public apellido: string;

    @IsString()
    public direccion: string;
}