import { Controller, Post, Body, Response, ValidationPipe, UseGuards, Get, Request } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';



@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto, @Response() res, @Request() req): Promise<void> {
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
    async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto, @Response() res: any) {
        try {
            let user = await this.authService.signIn(authCredentialsDto);

            return res.json({
                message: 'Đăng nhập thành công',
                data: user[0],
                access_token: user[1]
            })
        } catch (error) {
            return res.json({
                message: 'đăng nhập không thành công'
            })
        }

    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleLogin() {
        // initiates the Google OAuth2 login flow
        // return await this.authService.validateOAuthLogin('s', Provider);


    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleLoginCallback(@Request() req, @Response() res: any) {
        // handles the Google OAuth2 callback
        const jwt: string = await req.user.jwt;

        if (jwt) {
            res.redirect('http://localhost:3000');
        } else {
            res.redirect('http://localhost:3000/auth/google');
        }


    }

    @Get('protected')
    @UseGuards(AuthGuard('jwt'))
    protectedResource() {
        return 'JWT is working!';
    }


}
