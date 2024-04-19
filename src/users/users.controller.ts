import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { ValidationError } from 'class-validator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    try {
      await this.usersService.create(createUserDto);

      return res.status(HttpStatus.CREATED).send();
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(HttpStatus.BAD_REQUEST).send(error);
      } else {
        return res.status(HttpStatus.BAD_GATEWAY).send(error);
      }
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const users = await this.usersService.findAll();

      return res.status(HttpStatus.OK).send(users);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send(error);
    }
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(+id);

      return res.status(HttpStatus.OK).send(user);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).send({ error: error.message });
    }
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      await this.usersService.update(+id, updateUserDto);

      return res.status(HttpStatus.OK).send();
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(HttpStatus.BAD_REQUEST).send(error);
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ error: error.message });
      }
    }
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string) {
    try {
      await this.usersService.remove(+id);

      return res.status(HttpStatus.OK).send();
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send(error);
    }
  }
}
