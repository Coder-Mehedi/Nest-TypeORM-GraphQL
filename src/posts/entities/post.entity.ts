import { ObjectType, Field } from '@nestjs/graphql';
import { Comment } from 'comments/entities/comment.entity';
import { Like } from 'likes/entities/like.entity';
import { User } from 'users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column({ default: true })
  isPublished: boolean;

  @Field(() => User)
  @ManyToOne(() => User)
  user: User;

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment;

  @Field(() => [Like], { nullable: true })
  @OneToMany(() => Like, (like) => like.post)
  likes: Like;
}
