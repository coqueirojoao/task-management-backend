import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService
    ) {}

    async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {

        const user = await this.userService.findByEmail(signInDto.email);

        if (user?.password !== signInDto.password) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, email: user.email, role: user.role };

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
