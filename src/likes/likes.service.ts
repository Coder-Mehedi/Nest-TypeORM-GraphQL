import { Injectable } from '@nestjs/common';
import { Post } from 'posts/entities/post.entity';
import { User } from 'users/entities/user.entity';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService {
  async likeAPost(reqUser: User, postId: string) {
    try {
      const post = await Post.findOneOrFail(postId);
      if (!post.isPublished) throw new Error('Post not published');
      const user = await User.findOneOrFail(reqUser.id);
      const isFound = await Like.findOne({ where: { post, user } });

      if (isFound) return await Like.remove(isFound);

      const like = Like.create({ post, user });
      return await like.save();
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      return await Like.find({ relations: ['user', 'post', 'post.user'] });
    } catch (error) {
      console.log(error);
    }
  }
  async remove(reqUser: User, id: string) {
    try {
      const like = await Like.findOneOrFail(id, {
        relations: ['post', 'post.user', 'user'],
      });
      if (!like) throw new Error('Not Liked');
      console.log(like.post.user.id, reqUser.id, like.user.id);
      if (like.post.user.id === reqUser.id || like.user.id === reqUser.id) {
        await Like.remove(like);
        return 'Like Removed';
      }
      throw new Error('You are not allowed to do this action');
    } catch (error) {
      return error;
    }
  }
}
