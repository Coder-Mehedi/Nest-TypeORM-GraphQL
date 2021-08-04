import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class LikeAPostInput {
  @Field()
  postId: string;
}
