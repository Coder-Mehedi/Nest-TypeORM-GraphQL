import { Injectable } from '@nestjs/common';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  async create(createCommentInput: CreateCommentInput) {
    const { content, postId, userId } = createCommentInput;
    try {
      const post = await Post.findOneOrFail(postId);
      const author = await User.findOneOrFail(userId);
      const comment = Comment.create({ content, post, author });
      return await comment.save();
    } catch (error) {}
    return 'This action adds a new comment';
  }

  async findAll(postId: string) {
    try {
      return await Comment.find({ where: { post: postId } });
    } catch (error) {
      console.log(error);
    }
  }

  async update(updateCommentInput: UpdateCommentInput) {
    try {
      const comment = await Comment.findOneOrFail(updateCommentInput.id, {
        relations: ['author'],
      });
      comment.content = updateCommentInput.content;
      return await comment.save();
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    try {
      const comment = await Comment.findOneOrFail(id);
      await Comment.remove(comment);
      return 'Comment Removed';
    } catch (error) {
      throw new Error('Comment Not Found');
    }
  }
}
