import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class UpdateUserInput {
    @Field(() => String, { nullable: true })
    @IsOptional()
    name: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    email: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    password: string;
}
