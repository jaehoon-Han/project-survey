import { DataSource, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepository;
    private dataSource;
    constructor(userRepository: Repository<User>, dataSource: DataSource);
    create(createUserInput: CreateUserInput): Promise<User>;
    findAll(): Promise<User[]>;
    getUserWithResponse(id: number): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserInput: UpdateUserInput): Promise<import("typeorm").UpdateResult>;
    remove(id: number): string;
}
