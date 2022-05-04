import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class AuthLoginInput {
    @Field(() => String)
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field(() => String)
    @IsNotEmpty()
    password: string;
}
