import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service'; //importing the service(provider) and injecting it to the controller
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} //injection itself
  /* 
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
    */

  @Get() //Get /users or /users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  // In case you want to use some sub-routes you need to specify it before the Get(id),
  // otherwise nest will recognize any subrote as an ID
  //   @Get('interns')
  //   findAllInterns() {
  //     return [];
  //   }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id); //converting string param to a number required by our function or simple use unary plus operator "+"
  }

  @Post()
  create(
    @Body(ValidationPipe)
    user: CreateUserDto,
  ) {
    return this.usersService.create(user); //or pass there CreateUserDto: CreateUserDto
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    UpdateUserDTO: UpdateUserDTO,
  ) {
    return this.usersService.update(id, UpdateUserDTO);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
