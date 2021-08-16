import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Post } from 'posts/entities/post.entity';
import { User } from 'users/entities/user.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  async create(reqUser: User, createCommentInput: CreateCommentInput) {
    const { content, postId } = createCommentInput;
    try {
      const post = await Post.findOneOrFail(postId);
      if (!post.isPublished) throw new Error('Post not published');
      const author = await User.findOneOrFail(reqUser.id);
      const comment = Comment.create({ content, post, author });
      await comment.save();
      return await Post.findOneOrFail(postId, {
        relations: ['user', 'likes', 'likes.user', 'comments'],
      });
    } catch (error) {
      return error;
    }
  }

  async findAll(postId: string) {
    try {
      return await Comment.find({
        where: { post: postId },
        relations: ['author', 'post', 'post.user'],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async update(reqUser: User, updateCommentInput: UpdateCommentInput) {
    try {
      const comment = await Comment.findOneOrFail(updateCommentInput.id, {
        relations: ['author', 'post'],
      });
      if (!(comment.author.id === reqUser.id))
        throw new Error('You are not allowed to do this action');
      comment.content = updateCommentInput.content;
      await comment.save();
      return await Post.findOneOrFail(comment.post.id, {
        relations: [
          'user',
          'likes',
          'likes.user',
          'comments',
          'comments.author',
        ],
      });
    } catch (error) {
      return error;
    }
  }

  async remove(reqUser: User, id: string) {
    try {
      const comment = await Comment.findOneOrFail(id, {
        relations: ['post', 'post.user', 'author'],
      });

      if (!comment) throw new Error('Comment Not Found');
      if (
        comment.post.user.id === reqUser.id ||
        comment.author.id === reqUser.id
      ) {
        await Comment.remove(comment);
        return await Post.findOneOrFail(comment.post.id, {
          relations: ['user', 'likes', 'likes.user', 'comments'],
        });
      }
      throw new Error('You are not allowed to do this action');
    } catch (error) {
      return error;
    }
  }
}
