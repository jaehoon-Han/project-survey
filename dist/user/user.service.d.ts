import { EntityManager, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepository;
    private entityManager;
    constructor(userRepository: Repository<User>, entityManager: EntityManager);
    create(createUserInput: CreateUserInput): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    getUserWithResponse(id: number): Promise<User>;
    update(id: number, updateUserInput: UpdateUserInput): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<User>;
    removeSurveyResponse(id: number): Promise<import("typeorm").DeleteResult>;
    validUser(id: number): Promise<User>;
}
