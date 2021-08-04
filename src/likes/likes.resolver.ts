import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LikesService } from './likes.service';
import { Like } from './entities/like.entity';
import { CurrentUser } from 'shared/current-user.decorator';
import { User } from 'users/entities/user.entity';
import { Authorize } from 'auth/user.guard';

@Resolver(() => Like)
export class LikesResolver {
  constructor(private readonly likesService: LikesService) {}

  @Authorize()
  @Mutation(() => Like)
  likeAPost(@Args('postId') postId: string, @CurrentUser() reqUser: User) {
    return this.likesService.likeAPost(reqUser, postId);
  }

  @Query(() => [Like], { name: 'likes' })
  findAll() {
    return this.likesService.findAll();
  }
}
