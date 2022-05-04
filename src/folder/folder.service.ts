import { Injectable } from '@nestjs/common';
import { Bookmark, Folder } from '@prisma/client';
import { CreateBookmarkInput } from 'src/bookmark/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteFolderInput, UpdateFolderInput } from './dto';

@Injectable()
export class FolderService {
    constructor(private prisma: PrismaService) {}

    async findAllByUserId(userId: number): Promise<Folder[]> {
        try {
            const result = await this.prisma.folder.findMany({
                where: {
                    userId,
                },
            });

            return result;
        } catch (error) {
            throw error;
        }
    }

    async get(): Promise<Folder[]> {
        try {
            const result = await this.prisma.folder.findMany();

            return result;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id: number): Promise<Folder> {
        try {
            const result = await this.prisma.folder.findUnique({
                where: {
                    id,
                },
            });

            return result;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, data: UpdateFolderInput): Promise<Folder> {
        try {
            const result = this.prisma.folder.update({
                where: {
                    id,
                },
                data,
            });

            return result;
        } catch (error) {
            throw error;
        }
    }

    async delete(data: DeleteFolderInput): Promise<Folder> {
        try {
            const result = this.prisma.folder.delete({
                where: {
                    id: data.id,
                },
            });

            return result;
        } catch (error) {
            throw error;
        }
    }

    async createBookmark(folderId: number, data: CreateBookmarkInput): Promise<Bookmark> {
        try {
            const result = await this.prisma.bookmark.create({
                data: {
                    ...data,
                    folderId,
                },
            });

            return result;
        } catch (error) {
            throw error;
        }
    }
}
