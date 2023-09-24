import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('hello')
export class HelloController {

    //Protected route because the authentification is enabled globally!
    @Get("")
    helloWorld(){
        return "Hello World! User is authentified!"
    }

    //Public route
    @Get("public")
    @Public()
    helloWorldPublic(){
        return "Hello World! no authentification is required!"
    }
}
