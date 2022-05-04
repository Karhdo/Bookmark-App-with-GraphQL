import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetBookmarkArgs {
    @Field()
    @IsNotEmpty()
    id: number;
}
