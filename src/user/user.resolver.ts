import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { GetCurrent } from 'src/auth/decorator';
import { GqlAuthGuard } from 'src/auth/guard/gql-auth.guard';
import { BookmarkService } from 'src/bookmark/bookmark.service';
import { Bookmark } from 'src/bookmark/models/bookmark.model';
import { CreateFolderInput } from 'src/folder/dto/input/create-folder.input';
import { FolderService } from 'src/folder/folder.service';
import { Folder } from 'src/folder/models/folder.model';
import { DeleteUserInput, GetUserArgs, UpdateUserInput } from './dto';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly folderService: FolderService,
        private readonly bookmarkService: BookmarkService,
    ) {}

    @Query(() => [User], { name: 'users' })
    get(): Promise<User[]> {
        return this.userService.get();
    }

    @Query(() => User, { name: 'user', nullable: true })
    getOne(@Args() data: GetUserArgs): Promise<User> {
        return this.userService.getOne(data.id);
    }

    @Query(() => User, { name: 'currentUser' })
    getCurrent(@GetCurrent() user: User) {
        return this.userService.getCurrent(user.id);
    }

    @Mutation(() => User, { name: 'updateCurrent' })
    updateCurrent(@GetCurrent() user: User, @Args('updateUserData') data: UpdateUserInput): Promise<User> {
        return this.userService.updateCurrent(user.id, data);
    }

    @Mutation(() => User, { name: 'deleteUser' })
    delete(@Args('deleteUserData') data: DeleteUserInput): Promise<User> {
        return this.userService.delete(data);
    }

    @Mutation(() => Folder)
    createFolderByCurrent(@GetCurrent() user: User, @Args('createFolderData') data: CreateFolderInput) {
        return this.userService.createFolderByCurrent(user.id, data);
    }

    @ResolveField('folders', () => [Folder])
    async folders(@Parent() user: User): Promise<Folder[]> {
        return this.folderService.findAllByUserId(user.id);
    }

    @ResolveField('bookmarks', () => [Bookmark])
    async bookmarks(@Parent() folder: Folder): Promise<Bookmark[]> {
        return this.bookmarkService.findAllByFolderId(folder.id);
    }
}
