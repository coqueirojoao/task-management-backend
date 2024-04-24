import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Task } from "src/tasks/entities/task.entity";

export class CreateCategoryDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    color: string;

    @IsArray()
    taskIds!: number[] | null;
}
