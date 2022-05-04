import { Module } from '@nestjs/common';
import { BookmarkService } from 'src/bookmark/bookmark.service';
import { FolderService } from 'src/folder/folder.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    providers: [UserService, FolderService, BookmarkService, UserResolver],
})
export class UserModule {}
