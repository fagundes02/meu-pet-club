import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JWT_PASS } from './users/user.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) return false;
    const authToken = token.replace('Bearer ', '');
    const user = jwt.verify(authToken, JWT_PASS);
    console.log(user);
    // eslint-disable-next-line
    // @ts-ignore
    if (user && user.role === 'ADMIN') {
      request.user = user;
      return true;
    }

    return false;
  }
}
