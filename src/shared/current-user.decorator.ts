import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  async (_, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    if (!user) throw new UnauthorizedException();
    return await User.findOneBy({ email: user.email });
  },
);
