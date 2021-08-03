import { InputType, Int, Field } from '@nestjs/graphql';
import { User, UserRole } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => UserRole, { nullable: true })
  role: UserRole;
}
