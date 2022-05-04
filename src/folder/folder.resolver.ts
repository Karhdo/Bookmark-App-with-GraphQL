import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guard/gql-auth.guard';
import { BookmarkService } from 'src/bookmark/bookmark.service';
import { CreateBookmarkInput } from 'src/bookmark/dto';
import { Bookmark } from 'src/bookmark/models/bookmark.model';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
import { DeleteFolderInput, GetFolderArgs, UpdateFolderInput } from './dto';
import { FolderService } from './folder.service';
import { Folder } from './models/folder.model';

@Resolver(() => Folder)
@UseGuards(GqlAuthGuard)
export class FolderResolver {
    constructor(
        private readonly folderService: FolderService,
        private readonly bookmarkService: BookmarkService,
        private readonly userService: UserService,
    ) {}

    @Query(() => [Folder], { name: 'folders' })
    get(): Promise<Folder[]> {
        return this.folderService.get();
    }

    @Query(() => Folder, { name: 'folder' })
    getOne(@Args() data: GetFolderArgs): Promise<Folder> {
        return this.folderService.getOne(data.id);
    }

    @Mutation(() => Folder, { name: 'updateFolder' })
    update(@Args() folder: GetFolderArgs, @Args('updateFolderData') data: UpdateFolderInput): Promise<Folder> {
        return this.folderService.update(folder.id, data);
    }

    @Mutation(() => Folder, { name: 'deleteFolder' })
    delete(@Args('deleteFolderData') data: DeleteFolderInput): Promise<Folder> {
        return this.folderService.delete(data);
    }

    @Mutation(() => Bookmark, { name: 'createBookmark' })
    createBookmarkByFolderId(@Args() folder: GetFolderArgs, @Args('createBookmarkData') data: CreateBookmarkInput) {
        return this.folderService.createBookmark(folder.id, data);
    }

    @ResolveField('bookmarks', () => [Bookmark])
    async bookmarks(@Parent() folder: Folder): Promise<Bookmark[]> {
        return this.bookmarkService.findAllByFolderId(folder.id);
    }

    @ResolveField('user', () => User)
    async user(@Parent() folder: Folder): Promise<User> {
        return this.userService.getOne(folder.userId);
    }
}
