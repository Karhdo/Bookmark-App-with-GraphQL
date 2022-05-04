import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Bookmark {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    title: string;

    @Field(() => String, { nullable: true })
    description: string;

    @Field(() => Date)
    createdAt?: Date;

    @Field(() => Date)
    updatedAt?: Date;

    @Field(() => String)
    link: string;
}
