import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { TasksService } from 'src/tasks/tasks.service';
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
      throw new Error(error.message);
    }
  }

  async findAll() {
    try {
      return await this.categoryRepository.find({ relations: ['users', 'tasks'] });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAllById(id: number) {
    try {
      return await this.categoryRepository.findBy({
        users: {
          id: id
        }
      })
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, userId: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const tasks = await getTasksForRelation(this.taskService, updateCategoryDto.taskIds, userId);
      console.log(tasks);

      const category = await this.categoryRepository.findBy({ users: {
        id: userId
      },
      id: id
    })
    

    return await this.categoryRepository.save({...category[0], ...updateCategoryDto, tasks, updated_at: new Date() } )
    } catch (error) {
      console.log(error.message)
      throw new Error(error);
    }
  }

  async remove(id: number, userId: number) {
    try {
      const category = await this.categoryRepository.findBy({ users: {
        id: userId
      },
      id: id
    })

      const response = await this.categoryRepository.delete(category[0].id);

      return response;
    } catch (error) {
      throw new Error('Invalid Category ID');
    }
  }
}
