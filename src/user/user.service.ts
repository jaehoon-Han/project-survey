import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.userRepository.create(createUserInput);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  /**
   * @description "유저의 답변 조회"
   * @param id
   * @returns
   */
  async getUserWithResponse(id: number): Promise<User[]> {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.surveyResponse', 'surveyResponse')
      .where('user.id= :id', { id: id })
      .getMany();

    return result;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({
      id,
    });
    if (!user) {
      throw new BadRequestException(`NOT FOUND USER ID: ${id}`);
    }
    return user;
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.findOne(id);
    this.userRepository.merge(user, updateUserInput);
    return this.userRepository.update(id, user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.dataSource.manager.remove(user);
  }
  async removeSurveyResponse(id: number) {
    return await this.dataSource.manager.delete(SurveyResponse, { userId: id });
  }
}
