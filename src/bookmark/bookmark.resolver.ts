import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookmarkService } from './bookmark.service';
import { DeleteBookmarkInput, GetBookmarkArgs, UpdateBookmarkInput } from './dto';
import { Bookmark } from './models/bookmark.model';

@Resolver(() => Bookmark)
export class BookmarkResolver {
    constructor(private readonly bookmarkService: BookmarkService) {}

    @Query(() => [Bookmark], { name: 'bookmarks' })
    get(): Promise<Bookmark[]> {
        return this.bookmarkService.get();
    }

    @Query(() => Bookmark, { name: 'bookmark' })
    getOne(@Args() bookmark: GetBookmarkArgs): Promise<Bookmark> {
        return this.bookmarkService.getOne(bookmark.id);
    }

    @Mutation(() => Bookmark, { name: 'updateBookmark' })
    update(@Args() bookmark: GetBookmarkArgs, @Args('updateBookmarkData') data: UpdateBookmarkInput): Promise<Bookmark> {
        return this.bookmarkService.update(bookmark.id, data);
    }

    @Mutation(() => Bookmark, { name: 'deleteBookmark' })
    delete(@Args('deleteBookmarkData') data: DeleteBookmarkInput): Promise<Bookmark> {
        return this.bookmarkService.delete(data);
    }
}
