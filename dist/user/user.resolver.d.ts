import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserInput: CreateUserInput): Promise<User>;
    findAllUser(): Promise<User[]>;
    getUserWithResponse(id: number): Promise<User[]>;
    findOneUser(id: number): Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): Promise<import("typeorm").UpdateResult>;
    removeUser(id: number): Promise<import("typeorm").DeleteResult>;
}
