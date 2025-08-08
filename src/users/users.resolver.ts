import { Args, Int, Resolver, Query, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Resolver()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => [User])
  users() {
    return this.userService.findAll();
  }

  @Query(() => User, { nullable: true })
  user(@Args('id', { type: () => Int }) id: number) {
    console.log(id);
    const user = this.userService.findOne(id);
    return user || null;
  }

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput) {
    console.log(input);
    return this.userService.create(input);
  }
}
