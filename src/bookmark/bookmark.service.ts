import { Injectable } from '@nestjs/common';
import { Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteBookmarkInput, UpdateBookmarkInput } from './dto';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) {}

    async findAllByFolderId(folderId: number): Promise<Bookmark[]> {
        try {
            const result = this.prisma.bookmark.findMany({
                where: {
                    folderId,
                },
            });

            return result;
        } catch (error) {
            throw error;
        }
    }

    async get(): Promise<Bookmark[]> {
        try {
            const result = this.prisma.bookmark.findMany();

            return result;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id: number): Promise<Bookmark> {
        try {
            const result = this.prisma.bookmark.findUnique({
                where: { id },
            });

            return result;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, data: UpdateBookmarkInput): Promise<Bookmark> {
        try {
            const result = this.prisma.bookmark.update({
                where: {
                    id,
                },
                data,
            });

            return result;
        } catch (error) {}
    }

    async delete(data: DeleteBookmarkInput): Promise<Bookmark> {
        try {
            const result = await this.prisma.bookmark.delete({
                where: {
                    id: data.id,
                },
            });

            return result;
        } catch (error) {
            throw error;
        }
    }
}
