import { Module } from '@nestjs/common';
import { BookmarkResolver } from './bookmark.resolver';
import { BookmarkService } from './bookmark.service';

@Module({
    providers: [BookmarkService, BookmarkResolver],
})
export class BookmarkModule {}
