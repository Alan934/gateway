import { Min, IsString, IsEmail, IsStrongPassword, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAllUsers {

    id: number;

    public email: string;

    public password: string;

    public nombre: string;

    public apellido: string;

    public direccion: string;
}