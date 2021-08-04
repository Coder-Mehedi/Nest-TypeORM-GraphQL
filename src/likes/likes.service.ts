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
      return await Like.find({ relations: ['user'] });
    } catch (error) {
      console.log(error);
    }
  }
}
