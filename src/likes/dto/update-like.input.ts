import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { LikeAPostInput } from './like-a-post.input';

@InputType()
export class UpdateLikeInput extends PartialType(LikeAPostInput) {
  @Field(() => Int)
  id: number;
}
