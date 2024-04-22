import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';
import { Public } from './constants/public-endpoints.constant';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Public()
    @Post('login')
    async signIn(@Res() res: Response, @Body() signInDto: SignInDto) {

        const token = await this.authService.signIn(signInDto);

        return res.status(HttpStatus.ACCEPTED).send(token);
    }
}
