import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth.response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => AuthResponse)
  register(@Args('input') input: any) {
    return this.authService.register(input);
  }
  @Mutation(() => AuthResponse)
  login(@Args('input') input: any) {
    return this.authService.login(input);
  }
}
