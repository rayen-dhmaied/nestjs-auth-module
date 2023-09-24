import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField : 'email', // Choose this regarding to field that is used to identify in the database it can be username,email,login..etc. In my case, I choose email.
    })
  }

  //This method validate the user credentials using the validateUser method in authService. 
  async validate(email: string, password : string){
    const fetched_user = await this.authService.validateUser(email,password)
    if (!fetched_user) {
      throw new UnauthorizedException()
    }
    return fetched_user
  }

}