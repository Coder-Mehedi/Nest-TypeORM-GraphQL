import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { CurrentUser } from 'shared/current-user.decorator';
import { User } from 'users/entities/user.entity';
import { Authorize } from 'auth/user.guard';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Authorize()
  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentUser() reqUser: User,
  ) {
    return this.commentsService.create(reqUser, createCommentInput);
  }

  @Query(() => [Comment], { name: 'comments' })
  findAll(@Args('postId') postId: string) {
    return this.commentsService.findAll(postId);
  }

  @Mutation(() => Comment)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentsService.update(updateCommentInput);
  }

  @Mutation(() => String)
  removeComment(@Args('id') id: string) {
    return this.commentsService.remove(id);
  }
}
