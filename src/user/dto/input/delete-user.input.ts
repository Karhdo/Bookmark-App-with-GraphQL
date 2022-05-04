import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteUserInput {
    @Field(() => Number)
    @IsNotEmpty()
    id: number;
}
