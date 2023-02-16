import { SurveyResponseService } from 'src/survey-response/survey-response.service';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepository;
    private surveyResponse;
    constructor(userRepository: Repository<User>, surveyResponse: SurveyResponseService);
    create(createUserInput: CreateUserInput): Promise<User>;
    findAll(): Promise<User[]>;
    getUserWithResponse(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserInput: UpdateUserInput): string;
    remove(id: number): string;
}
