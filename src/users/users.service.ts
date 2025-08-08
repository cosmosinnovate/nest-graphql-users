import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  create(input: CreateUserInput): User {
    const newUser = { id: this.idCounter++, ...input };
    console.log(newUser);
    this.users.push(newUser);
    return newUser;
  }

  findByEmail(email: string): User {
    return this.users.find((user) => user.email === email);
  }

  findAll(): User[] {
    console.log(this.users);
    return this.users;
  }

  findOne(id: number): User {
    console.log(id);
    return this.users.find((user) => user.id === id);
  }
}
