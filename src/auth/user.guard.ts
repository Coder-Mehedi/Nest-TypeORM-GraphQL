import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Post } from 'posts/entities/post.entity';
import { User, UserRole } from 'users/entities/user.entity';
import { GqlAuthGuard } from './auth.guard';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    const ctx = GqlExecutionContext.create(context);
    const email = ctx.getContext().req.user.email;
    const user = await User.findOneBy({ email });

    if (!roles.includes(user.role)) return false;
    return true;
  }
}

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(private disallowAdmin: boolean = false) {
    disallowAdmin = this.disallowAdmin;
  }
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const email = ctx.getContext().req.user.email;
    const user = await User.findOneBy({ email });

    const [req, res] = context.getArgs();
    const post = await Post.findOneOrFail({
      where: { id: req.id },
      relations: ['user'],
    });
    if (post.user.id === user.id) return true;

    if (!this.disallowAdmin && user.role === UserRole.Admin) return true;
    return false;
  }
}

export const IsCreator = (options: { disallowAdmin?: boolean } = {}) => {
  return UseGuards(GqlAuthGuard, new IsCreatorGuard(options.disallowAdmin));
};

export const Authorize = (roles?: string | string[]) => {
  if (!roles) return UseGuards(GqlAuthGuard);

  return applyDecorators(
    SetMetadata('roles', [roles].flat()),
    UseGuards(GqlAuthGuard, RolesGuard),
  );
};
