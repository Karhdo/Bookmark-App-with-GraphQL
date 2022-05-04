import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteBookmarkInput {
    @Field(() => Int)
    @IsNotEmpty()
    id: number;
}
