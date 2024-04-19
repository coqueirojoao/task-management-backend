import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

@Injectable()
export class EmailAuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const email = req.body.email;

    if (!email) {
      return next()
    }

    const user = await this.userService.findByEmail(email);

    if (user?.email === email) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ error: 'E-mail already in use' });
    } else {
     return next();
    }
  }
}
