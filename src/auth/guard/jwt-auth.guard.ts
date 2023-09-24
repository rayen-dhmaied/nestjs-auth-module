import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';


//This guard imposes the jwt verification.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
      }

      canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
          context.getHandler(),
          context.getClass(),
        ]);

        //If public decorator is used on a controller or a route then jwt verification is ignored.
        if (isPublic) {
          return true;
        }
        return super.canActivate(context);
      }
}