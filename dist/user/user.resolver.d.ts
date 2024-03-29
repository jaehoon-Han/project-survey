import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    create(input: CreateUserInput): Promise<User>;
    findAll(): Promise<User[]>;
    getUserWithResponse(id: number): Promise<User>;
    findOne(id: number): Promise<User>;
    update(updateUserInput: UpdateUserInput): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<User>;
}
