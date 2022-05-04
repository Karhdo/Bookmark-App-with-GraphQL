import { Module } from '@nestjs/common';
import { BookmarkService } from 'src/bookmark/bookmark.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { FolderResolver } from './folder.resolver';
import { FolderService } from './folder.service';

@Module({
    providers: [FolderService, FolderResolver, BookmarkService, UserService],
})
export class FolderModule {}
