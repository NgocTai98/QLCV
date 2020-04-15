import { Controller, Post, Body, Response, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor (
        private authService: AuthService,
        ){}
    
    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto, @Response() res): Promise<void>{
        try {
            let newUser = await this.authService.signUp(authCredentialsDto);
           
            return res.json({
                message: 'Đã đăng ký thành công',
                data: newUser
            })
        } catch (error) {
           
            return res.json({
                message: 'Đăng ký không thành công'
            })
        }
      
    }

    @Post('/signin')
    async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        console.log(authCredentialsDto);
        
        return await this.authService.signIn(authCredentialsDto);
        
    }

}
