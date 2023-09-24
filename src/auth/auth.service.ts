import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private users : UsersService, private jwt : JwtService){}

    //This method is used to verify the existence of user in the database then matching password.
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.users.findOne(email);
        if (user && user.password === password) { // In my case, my users list is hard coded. In a real world application, usres should be stored in a database and the password are hashed so you'll comparing passwords in different way such as using bcrypt.
          const { password, ...result } = user;
          return result;
        }
        return null;
    }

    //This method generate and return the access token.
    async login(user: {id : number, email : string}) {
        const payload = { email: user.email, sub: user.id}
        return {access_token: this.jwt.sign(payload)}
    }

}
