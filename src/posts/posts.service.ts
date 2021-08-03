import { Injectable } from '@nestjs/common';
import { User } from 'users/entities/user.entity';
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
      return await post.save();
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      return await Post.find({ relations: ['user', 'likes', 'comments'] });
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    try {
      return await Post.findOne(
        { id },
        { relations: ['user', 'likes', 'comments'] },
      );
    } catch (error) {
      console.log(error);
    }
  }

  async update(updatePostInput: UpdatePostInput) {
    try {
      const post = await Post.findOneOrFail(updatePostInput.id, {
        relations: ['user'],
      });
      const user = await User.findOneOrFail({
        where: { id: updatePostInput.userId },
      });
      if (post.user.id === user.id) {
        post.content = updatePostInput.content;
        return post.save();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    try {
      const post = await Post.findOneOrFail(id);
      await Post.remove(post);
      return 'Post Deleted';
    } catch (error) {
      throw new Error('Post not found');
    }
  }

  async publish(id: string) {
    try {
      const post = await Post.findOneOrFail(id, {
        relations: ['user'],
      });
      if (post.isPublished) throw new Error('Post Was Already Published');
      post.isPublished = true;
      await post.save();
      return 'Post Published';
    } catch (error) {
      return error;
    }
  }
  async unpublish(id: string) {
    try {
      const post = await Post.findOneOrFail(id, {
        relations: ['user'],
      });
      if (!post.isPublished) throw new Error('Post not yet published');
      post.isPublished = false;
      await post.save();
      return 'Post Unpublished';
    } catch (error) {
      return error;
    }
  }
}
