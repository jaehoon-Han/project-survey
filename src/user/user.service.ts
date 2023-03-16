import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private entityManager: EntityManager,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.userRepository.create(createUserInput);
    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.validUser(id);
  }

  /**
   * @description "유저의 답변 조회"
   * @param id
   * @returns
   */
  async getUserWithResponse(id: number): Promise<User> {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.surveyResponse', 'surveyResponse')
      .where('user.id= :id', { id: id })
      .getOne();
    return result;
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.findOne(id);
    this.userRepository.merge(user, updateUserInput);
    return this.userRepository.update(id, user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.entityManager.remove(user);
  }
  async removeSurveyResponse(id: number) {
    return await this.entityManager.delete(SurveyResponse, { userId: id });
  }

  async validUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error(`CAN NOT FIND USER! ID: ${id}`);
    }
    return user;
  }
}
