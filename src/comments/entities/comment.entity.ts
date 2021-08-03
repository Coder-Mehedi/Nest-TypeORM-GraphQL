import { ObjectType, Field } from '@nestjs/graphql';
import { Post } from 'posts/entities/post.entity';
import { User } from 'users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  content: string;

  @Field(() => User)
  @ManyToOne(() => User)
  author: User;

  @Field(() => Post)
  @ManyToOne(() => Post)
  post: Post;
}
