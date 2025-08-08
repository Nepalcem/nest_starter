import { Injectable, NotFoundException } from '@nestjs/common';  //NotFound Exception for error handling
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Gram', email: 'test1@test.com', role: 'INTERN' },
    { id: 2, name: 'Dave', email: 'test2@test.com', role: 'INTERN' },
    { id: 3, name: 'Bob', email: 'test3@test.com', role: 'ENGINEER' },
    { id: 4, name: 'Mat', email: 'test4@test.com', role: 'ENGINEER' },
    { id: 5, name: 'Mark', email: 'test5@test.com', role: 'ADMIN' },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
      if (role) {
          const rolesArray = this.users.filter((user) => user.role === role);
          if (rolesArray.length === 0) {
              throw new NotFoundException("User Role not Found")
              return rolesArray
          }
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  create(user: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: UpdateUserDTO) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
