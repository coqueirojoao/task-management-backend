import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';
import { Role } from 'src/guard/roles/enum/role.enum';
import { Roles } from 'src/guard/roles/constants/roles-endpoints.constant';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('create')
  async create(@Res() res: Response, @Req() req: Request & { user: { sub: string } }, @Body() createCategoryDto: CreateCategoryDto) {
    try {
      const userId = Number(req.user.sub);
      await this.categoriesService.create(createCategoryDto, userId);

      return res.status(HttpStatus.CREATED).send();
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(HttpStatus.BAD_REQUEST).send(error);
      } else {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: error.message });
      }
    }
  }

  @Roles(Role.ADMIN)
  @Get()
 async findAll(@Res() res: Response) {
    try {
      const categories = await this.categoriesService.findAll();

      return res.status(HttpStatus.OK).send(categories);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send(error);
    }
  }

  @Get(':id')
  async findAllById(@Res() res: Response, @Req() req: Request & { user: { sub: string, role: Role } }, @Param('id') id: string) {
    try {
      const user = req.user
      if (+id === +user.sub || user.role.includes(Role.ADMIN)) {
        const tasks = await this.categoriesService.findAllById(+id);

        return res.status(HttpStatus.OK).send(tasks);
      } else {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: "Invalid User ID" });
      }
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send(error);
    }
  }

  @Patch(':id')
  async update(@Res() res: Response, @Req() req: Request & { user: { sub: string } }, @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    try {
      const userId = Number(req.user.sub);
      await this.categoriesService.update(+id, userId, updateCategoryDto);

      return res.status(HttpStatus.OK).send();
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(HttpStatus.BAD_REQUEST).send(error);
      } else {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: "Invalid Category ID" });
      }
  }
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Req() req: Request & { user: { sub: string } }, @Param('id') id: string) {
    try {
      const userId = Number(req.user.sub);

      await this.categoriesService.remove(+id, userId);

      return res.status(HttpStatus.OK).send();
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({ error: error.message });
    }
  }
}
