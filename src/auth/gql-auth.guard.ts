import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  handleRequest(err, user, info, context, status) {
    if (err || !user) {
      // You can customize this message as you like
      throw new UnauthorizedException(
        'You must be logged in to access this resource.',
      );
    }
    return user;
  }
}
