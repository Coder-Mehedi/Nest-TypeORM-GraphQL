import { Injectable } from '@nestjs/common';
import { User } from 'users/entities/user.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  async create(reqUser: User, createPostInput: CreatePostInput) {
    try {
      const user = await User.findOneOrFail({
        where: { id: reqUser.id },
      });
      const post = Post.create({ ...createPostInput, user });
      return await post.save();
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      return await Post.find({
        relations: ['user', 'likes', 'likes.user', 'comments'],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    try {
      return await Post.findOneOrFail(
        { id },
        {
          relations: [
            'user',
            'likes',
            'likes.user',
            'comments',
            'comments.author',
          ],
        },
      );
    } catch (error) {
      throw new Error('Post not found!');
    }
  }

  async update(reqUser: User, id: string, updatePostInput: UpdatePostInput) {
    try {
      const post = await Post.findOneOrFail(id, {
        relations: ['user'],
      });
      post.content = updatePostInput.content;
      return post.save();
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
      return error;
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
  async unpublish(reqUser: User, id: string) {
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
