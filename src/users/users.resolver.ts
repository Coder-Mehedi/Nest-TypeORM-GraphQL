import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { CurrentUser } from 'shared/current-user.decorator';
import { Authorize } from 'auth/user.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  registerUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Authorize()
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Authorize()
  @Query(() => User, { name: 'user' })
  findOneBy(@Args('id') id: string) {
    return this.usersService.findOneBy(id);
  }

  @Authorize()
  @Query(() => User)
  currentUser(@CurrentUser() user: User) {
    return user;
  }
}
