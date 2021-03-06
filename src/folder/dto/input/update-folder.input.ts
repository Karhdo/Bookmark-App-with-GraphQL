import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateFolderInput {
    @Field(() => String)
    @IsNotEmpty()
    name: string;
}
