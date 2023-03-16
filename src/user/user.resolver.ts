import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { name: 'createUser' })
  create(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Query(() => [User], { name: 'findAllUser' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => [User], { name: 'getUserWithResponse' })
  getUserWithResponse(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserWithResponse(id);
  }

  @Query(() => User, { name: 'findOneUser' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User, { name: 'updateUser' })
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User, { name: 'removeUser' })
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
