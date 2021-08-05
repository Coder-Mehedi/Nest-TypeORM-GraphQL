import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Comment } from 'comments/entities/comment.entity';
import { Like } from 'likes/entities/like.entity';
import { Post } from 'posts/entities/post.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}
registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ unique: true })
  password: string;

  @Field(() => UserRole, { nullable: true })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  role: UserRole;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @Field(() => [Like], { nullable: true })
  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
}
