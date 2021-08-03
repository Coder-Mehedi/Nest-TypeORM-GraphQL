// import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { Reflector } from '@nestjs/core';
// import { validateToken } from 'services/auth/validate-token';
// import { User } from 'users/entities/user.entity';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const roles = this.reflector.get<[]>('roles', context.getHandler());

//     try {
//       const ctx = GqlExecutionContext.create(context);
//       const token = ctx.getContext().token as string;
//       const email = ctx.getContext().token;
//       const key = ctx.getContext().key;

//       const isValidUser = await validateToken(token, key);
//       if (!isValidUser) throw new Error('Invalid User');

//       const requestingUser: User | undefined | null = await getUser(email);
//       if (!requestingUser) return false;

//       return this.matchRoles(roles, requestingUser.accessRole);
//     } catch (e) {
//       Logger.error('ERROR', e);
//     }
//     return false;
//   }

//   public matchRoles(requestedRole: UserAccessRole[], role: UserAccessRole): boolean {
//     return requestedRole.includes(role);
//   }
// }
