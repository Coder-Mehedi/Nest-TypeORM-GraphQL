import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { CurrentUser } from 'shared/current-user.decorator';
import { User } from 'users/entities/user.entity';
import { Authorize } from 'auth/user.guard';
import { Post } from 'posts/entities/post.entity';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Authorize()
  @Mutation(() => Post)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentUser() reqUser: User,
  ) {
    return this.commentsService.create(reqUser, createCommentInput);
  }

  @Authorize()
  @Query(() => [Comment], { name: 'comments' })
  findAll(@Args('postId') postId: string) {
    return this.commentsService.findAll(postId);
  }

  @Authorize()
  @Mutation(() => Post)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
    @CurrentUser() reqUser: User,
  ) {
    return this.commentsService.update(reqUser, updateCommentInput);
  }

  @Authorize()
  @Mutation(() => Post)
  removeComment(@Args('id') id: string, @CurrentUser() reqUser: User) {
    return this.commentsService.remove(reqUser, id);
  }
}
