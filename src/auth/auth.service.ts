import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async register(input: RegisterInput) {
    const hashPassword = await bcrypt.hash(input.password, 10);
    const user = this.usersService.create({
      name: input.name,
      email: input.email,
      password: hashPassword,
    });
    return this.generateToken(user);
  }
  async login(input: LoginInput) {
    const user = this.usersService.findByEmail(input.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');
    return this.generateToken(user);
  }
  private generateToken(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}
