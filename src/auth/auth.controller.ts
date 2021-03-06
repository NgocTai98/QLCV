import { Controller, Post, Body, Response, ValidationPipe, UseGuards, Get, Request } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';



@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    // @Post('/signup')
    // async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto, @Response() res, @Request() req): Promise<void> {
    //     try {

    //         let newUser = await this.authService.signUp(authCredentialsDto);

    //         return res.json({
    //             message: 'Đã đăng ký thành công',
    //             data: newUser
    //         })
    //     } catch (error) {

    //         return res.json({
    //             message: 'Đăng ký không thành công'
    //         })
    //     }

    // }

    // @Post('/signin')
    // async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto, @Response() res: any) {
    //     try {
    //         let user = await this.authService.signIn(authCredentialsDto);

    //         return res.json({
    //             message: 'Đăng nhập thành công',
    //             data: user[0],
    //             access_token: user[1]
    //         })
    //     } catch (error) {
    //         return res.json({
    //             message: 'đăng nhập không thành công'
    //         })
    //     }

    // }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleLogin() {
       
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleLoginCallback(@Request() req: any, @Response() res: any) {
    
        const token = req.user.token;
        let id = req.user.sub;
        let role = req.user.role
       
        let accessToken = await this.authService.signIn(id,role);
     
        if (token) {
            res.json({
                message: "Đăng nhập thành công",
                access_token: accessToken
            })
        } else {
            res.redirect('http://localhost:3000/auth/google');
        }


    }

    // @Get('protected')
    // @UseGuards(AuthGuard('jwt'))
    // protectedResource() {
    //     return 'JWT is working!';
    // }


}
