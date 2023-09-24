import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private users: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // This will extract the token from the auth header also known as Bearer token.
      ignoreExpiration: false, // true means that checking the expiration of the token will be ignored.
      secretOrKey: "secretphrase", //The same secret that was used while registering JwtModule.
    });
  }


  //This method will try to decode and  validate the access token. If it's valid it will continue the execution of the request else it will throw unauthorized exception.
  async validate(payload: {email : string, sub : number}) {

    //You can add additional verification such as verifying the existence of user that correspond to the id inside the token.
    if(!this.users.findOne(payload.email)){
      throw new UnauthorizedException()
    }

    return { id: payload.sub, rmail : payload.email };
  }
}