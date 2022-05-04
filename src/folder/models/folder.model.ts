import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Bookmark } from 'src/bookmark/models/bookmark.model';

@ObjectType()
export class Folder {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    name: string;

    @Field(() => Int)
    userId: number;

    @Field(() => Date)
    createdAt?: Date;

    @Field(() => Date)
    updatedAt?: Date;

    @Field(() => [Bookmark], { nullable: true })
    bookmarks?: Bookmark[];
}
