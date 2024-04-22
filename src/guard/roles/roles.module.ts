import { Module } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [UsersModule],
    providers: [
        {
          provide: APP_GUARD,
          useClass: RolesGuard
        }
      ],
})
export class RolesModule {}
