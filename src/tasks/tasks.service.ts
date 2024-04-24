import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) {}


  async create(createTaskDto: CreateTaskDto, userId: number) {
    try {
      const task = this.taskRepository.create({ ...createTaskDto, users: { id: userId } });
      return await this.taskRepository.save(task);
    } catch (error) {
      throw new Error(error);
    }
  }


  async findAll(): Promise<Task[]> {
    try {
      return await this.taskRepository.find({ relations: ['users'] });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllById(id: number) {
    try {
      return await this.taskRepository.findBy({
        users: {
          id: id
        }
      })
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: number, userId: number) {
    try {
      return await this.taskRepository.findBy({
        users: { id: userId },
        id: id
      })
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, userId: number, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.taskRepository.findBy({ users: {
        id: userId
      },
      id: id
    })
    const taskFinished = updateTaskDto.finished_at ? new Date() : null

    return await this.taskRepository.update(task[0].id, { ...updateTaskDto, updated_at: new Date(), finished_at: taskFinished } )
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number, userId: number) {
    try {
      const task = await this.taskRepository.findBy({ users: {
        id: userId
      },
      id: id
    })

      const response = await this.taskRepository.delete(task[0].id);

      return response;
    } catch (error) {
      throw new Error('Invalid Task ID');
    }
  }
}
