import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { LikesService } from './likes.service';
import { Like } from './entities/like.entity';
import { LikeAPostInput } from './dto/like-a-post.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';

@Resolver(() => Like)
export class LikesResolver {
  constructor(private readonly likesService: LikesService) {}

  @Mutation(() => Like)
  likeAPost(@Args('likeAPostInput') likeAPostInput: LikeAPostInput) {
    return this.likesService.likeAPost(likeAPostInput);
  }

  @Query(() => [Like], { name: 'likes' })
  findAll() {
    return this.likesService.findAll();
  }

  @Query(() => Like, { name: 'like' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.likesService.findOne(id);
  }

  @Mutation(() => Like)
  updateLike(@Args('updateLikeInput') updateLikeInput: UpdateLikeInput) {
    return this.likesService.update(updateLikeInput.id, updateLikeInput);
  }

  @Mutation(() => Like)
  removeLike(@Args('id', { type: () => Int }) id: number) {
    return this.likesService.remove(id);
  }

  //   @ResolveField('user', (returns) => [User])
  //   async user(@Parent() like: Like) {
  //     const { id } = like;
  //     const res = await this.likesService.findAll({ id });
  //     console.log(res);
  //     return res;
  //   }
}
