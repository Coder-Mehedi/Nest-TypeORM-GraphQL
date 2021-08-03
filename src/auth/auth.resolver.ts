import { Args, Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql';
import { Like } from 'likes/entities/like.entity';
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';

@ObjectType()
class AccessToken {
  @Field()
  access_token: string;
}

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AccessToken)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
