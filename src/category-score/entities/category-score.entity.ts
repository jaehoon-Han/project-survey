import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { CommonEntity } from 'src/common/entities/commonentity.interface';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class CategoryScore extends CommonEntity {
  @Field(() => Int)
  @Column()
  @IsNumber()
  maxScore: number;

  @Field(() => Int)
  @Column()
  @IsNumber()
  minScore: number;

  @Field(() => String)
  @Column()
  @IsString()
  message: string;

  @Field(() => Int)
  @IsNumber()
  @Column()
  categoryId: number;

  @Field(() => Category)
  @JoinColumn({ name: 'categoryId' })
  @ManyToOne(() => Category, (category) => category.categoryScore, {
    onDelete: 'CASCADE',
  })
  category: Category;
}
