import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'posts/entities/post.entity';
import { User } from 'users/entities/user.entity';
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Like extends BaseEntity {
  @Field({ nullable: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  post: Post;
}
