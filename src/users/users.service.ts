import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)
  private userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    }
    catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<User[]> {

    try {
      return await this.userRepository.find();
    }
    catch (error) {
      throw new Error(error);
    }

  }

  async findOne(id: number): Promise<User | void> {
    try {
      const user = await this.userRepository.findOneBy({ id })
      
      if (!user) {
        throw new Error('User not found');
      }

      return user;
    }
    catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.userRepository.update(id, updateUserDto);
    }
    catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.userRepository.delete(id);
    }
    catch (error) {
      throw new Error(error);
    }
  }
}
