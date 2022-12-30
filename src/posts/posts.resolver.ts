import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Authorize, IsCreator } from 'auth/user.guard';
import { User, UserRole } from 'users/entities/user.entity';
import { CurrentUser } from 'shared/current-user.decorator';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Authorize()
  @Mutation(() => Post)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUser() reqUser: User,
  ) {
    return this.postsService.create(reqUser, createPostInput);
  }

  // @Authorize()
  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postsService.findAll();
  }

  // @Authorize()
  @Query(() => Post, { name: 'post' })
  findOneBy(@Args('id') id: string) {
    return this.postsService.findOneBy(id);
  }

  @IsCreator({ disallowAdmin: true })
  @Mutation(() => Post)
  updatePost(
    @Args('id') id: string,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
    @CurrentUser() reqUser: User,
  ) {
    return this.postsService.update(reqUser, id, updatePostInput);
  }

  @IsCreator({ disallowAdmin: true })
  @Mutation(() => String)
  removePost(@Args('id') id: string) {
    return this.postsService.remove(id);
  }

  @IsCreator()
  @Mutation(() => String)
  publishPost(@Args('id') id: string) {
    return this.postsService.publish(id);
  }

  @Authorize(UserRole.Admin)
  @Mutation(() => String)
  unpublishPost(@Args('id') id: string, @CurrentUser() reqUser: User) {
    return this.postsService.unpublish(reqUser, id);
  }
}
