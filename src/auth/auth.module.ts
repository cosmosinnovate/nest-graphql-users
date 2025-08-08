import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'super-secret',
      signOptions: { expiresIn: '5m' }, // Change from 5m to 1h
    }),
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
