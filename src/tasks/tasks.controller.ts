import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Roles } from 'src/guard/roles/constants/roles-endpoints.constant';
import { Role } from 'src/guard/roles/enum/role.enum';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  async create(@Res() res: Response, @Req() req: Request & { user: { sub: string } }, @Body() createTaskDto: CreateTaskDto) {
    try {
      const userId = Number(req.user.sub);
      await this.tasksService.create(createTaskDto, userId);

      return res.status(HttpStatus.CREATED).send();
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(HttpStatus.BAD_REQUEST).send(error);
      } else {
        return res.status(HttpStatus.BAD_GATEWAY).send(error);
      }
    }
    
  }

  @Roles(Role.ADMIN)
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const tasks = await this.tasksService.findAll();

      return res.status(HttpStatus.OK).send(tasks);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send(error);
    }
  }

  @Get(':id')
  async findAllById(@Res() res: Response, @Param('id') id: string, @Req() req: Request & { user: { sub: string, role: Role } }) {
    try {
      const user = req.user
      if (+id === +user.sub || user.role.includes(Role.ADMIN)) {
        const tasks = await this.tasksService.findAllById(+id);

        return res.status(HttpStatus.OK).send(tasks);
      } else {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: "Invalid User ID" });
      }
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
