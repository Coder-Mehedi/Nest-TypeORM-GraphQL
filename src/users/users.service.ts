import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async create(createUserInput: CreateUserInput) {
    const user = User.create({ ...createUserInput });
    return await user.save();
  }

  async findAll() {
    try {
      return await User.find({ relations: ['posts'] });
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    try {
      return await User.findOne({ id }, { relations: ['posts'] });
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
