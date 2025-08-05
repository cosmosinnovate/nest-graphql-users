import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  create(input: CreateUserInput): User {
    const newUser = { id: this.idCounter++, ...input };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    return this.users.find((user) => user.id === id);
  }
}
