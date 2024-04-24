import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { TasksService } from 'src/tasks/tasks.service';
import { Task } from 'src/tasks/entities/task.entity';
import { getTasksForRelation } from './utils/getTasksForRelation';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private taskService: TasksService
) {}

  async create(createCategoryDto: CreateCategoryDto, userId: number) {
    try {

      const tasks = await getTasksForRelation(this.taskService, createCategoryDto.taskIds, userId);
      
      const category = this.categoryRepository.create({...createCategoryDto, users: { id: userId }, tasks });
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return await this.categoryRepository.find({ relations: ['users', 'tasks'] });
    } catch (error) {
      throw new Error(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
