import { Injectable } from '@nestjs/common';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { LikeAPostInput } from './dto/like-a-post.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService {
  async likeAPost(likeAPostInput: LikeAPostInput) {
    const { postId, userId } = likeAPostInput;

    try {
      const post = await Post.findOneOrFail(postId);
      const user = await User.findOneOrFail(userId);
      const isFound = await Like.findOne({ where: { post, user } });

      // if (isFound) return { id: isFound.id, post, user };
      if (isFound) {
        return await Like.remove(isFound);
      }

      const like = Like.create({ post, user });
      return await like.save();
    } catch (error) {
      console.log(error);
    }
    return 'This action adds a new like';
  }

  findAll() {
    return `This action returns all likes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, updateLikeInput: UpdateLikeInput) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
