import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  async create(createPostInput: CreatePostInput) {
    try {
      const user = await User.findOneOrFail({
        where: { id: createPostInput.userId },
      });
      const post = Post.create({ ...createPostInput, user });
      console.log(user);
      return await post.save();
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      return await Post.find({ relations: ['user'] });
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
