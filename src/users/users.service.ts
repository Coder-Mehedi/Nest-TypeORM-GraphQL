import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Authorize } from 'auth/user.guard';
@Injectable()
export class UsersService {
  async create(createUserInput: CreateUserInput) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(createUserInput.password, saltRounds);
    const user = User.create({ ...createUserInput, password: hash });
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

  async findOneByEmail(email: string) {
    try {
      return await User.findOne({ email }, { relations: ['posts'] });
    } catch (error) {
      console.log(error);
    }
  }
}
