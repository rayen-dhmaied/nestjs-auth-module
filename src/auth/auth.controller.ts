import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //This route returns the accessToken so we have to verify the user credentials before returning the access token.
    @Post('sign-in')
    //Using LocalAuthGuard to impose user credentials verification
    @UseGuards(LocalAuthGuard)
    //Using Public decorator to ignore access token validation.
    @Public()
    signIn(@Req() req : any){
        return this.authService.login(req.user);
    }
}
