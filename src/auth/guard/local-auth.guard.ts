import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//Local Guard to impose the user credentials verification.
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}