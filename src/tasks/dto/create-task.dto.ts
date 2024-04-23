import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateTaskDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

}
