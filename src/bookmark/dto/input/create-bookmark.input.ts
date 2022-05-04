import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateBookmarkInput {
    @Field(() => String)
    @IsNotEmpty()
    title: string;

    @Field(() => String)
    @IsOptional()
    description: string;

    @Field(() => String)
    @IsNotEmpty()
    link: string;
}
