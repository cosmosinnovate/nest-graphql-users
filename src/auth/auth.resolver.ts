import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth.response';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => AuthResponse)
  register(@Args('input', { type: () => RegisterInput }) input: RegisterInput) {
    return this.authService.register(input);
  }
  @Mutation(() => AuthResponse)
  login(@Args('input', { type: () => LoginInput }) input: LoginInput) {
    return this.authService.login(input);
  }
}
