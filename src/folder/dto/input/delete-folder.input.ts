import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteFolderInput {
    @Field(() => Int)
    @IsNotEmpty()
    id: number;
}
