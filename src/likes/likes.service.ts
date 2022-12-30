import { Injectable } from '@nestjs/common';
import { Post } from 'posts/entities/post.entity';
import { User } from 'users/entities/user.entity';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService {
  async likeAPost(reqUser: User, postId: string) {
    try {
      const post = await Post.findOneOrFail({ where: { id: postId } });
      if (!post.isPublished) throw new Error('Post not published');

      const user = await User.findOneOrFail({ where: { id: reqUser.id } });
      const isFound = await Like.findOne({
        where: { post: { id: postId }, user: { id: reqUser.id } },
      });

      if (isFound) {
        await Like.remove(isFound);
        return await Post.findOneOrFail({
          where: { id: postId },
          relations: ['user', 'likes', 'likes.user', 'comments'],
        });
      }

      const like = Like.create({ post, user });
      await like.save();
      return await Post.findOneOrFail({
        where: { id: postId },
        relations: ['user', 'likes', 'likes.user', 'comments'],
      });
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
      const like = await Like.findOneOrFail({
        where: { id },

        relations: ['post', 'post.user', 'user'],
      });
      if (!like) throw new Error('Not Liked');
      if (like.post.user.id === reqUser.id || like.user.id === reqUser.id) {
        await Like.remove(like);
        return await Post.findOneOrFail({
          where: { id: like.post.id },
          relations: ['user', 'likes', 'likes.user', 'comments'],
        });
      }
      throw new Error('You are not allowed to do this action');
    } catch (error) {
      return error;
    }
  }
}
