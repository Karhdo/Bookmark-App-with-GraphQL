import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Folder } from 'src/folder/models/folder.model';

@ObjectType()
export class User {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    name: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    hash: string;

    @Field(() => Date)
    createdAt?: Date;

    @Field(() => Date)
    updatedAt?: Date;

    @Field(() => [Folder], { nullable: true })
    folders?: Folder[];
}
