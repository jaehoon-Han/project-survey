import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserInput: CreateUserInput): Promise<User>;
    findAll(): Promise<User[]>;
    getUserWithResponse(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): string;
    removeUser(id: number): string;
}
