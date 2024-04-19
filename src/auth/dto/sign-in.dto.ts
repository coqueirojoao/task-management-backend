import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import ILogin from "../interfaces/login.interface";

export class SignInDto implements ILogin {
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @IsString()
    password: string;
}