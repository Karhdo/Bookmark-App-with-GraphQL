import { Injectable } from '@nestjs/common';
import { Folder, User } from '@prisma/client';
import * as argon from 'argon2';
import { CreateFolderInput } from 'src/folder/dto/input/create-folder.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteUserInput, UpdateUserInput } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async get(): Promise<User[]> {
        try {
            const result = await this.prisma.user.findMany();

            return result;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id: number): Promise<User> {
        try {
            const result = await this.prisma.user.findUnique({
                where: {
                    id,
                },
            });

            return result;
        } catch (error) {
            throw error;
        }
    }

    async getCurrent(id: number): Promise<User> {
        try {
            const result = await this.prisma.user.findUnique({
                where: {
                    id,
                },
            });

            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateCurrent(id: number, data: UpdateUserInput): Promise<User> {
        try {
            // Hash new password
            const newHash = await argon.hash(data.password);

            const result = await this.prisma.user.update({
                where: {
                    id,
                },
                data: {
                    name: data.name,
                    email: data.email,
                    hash: newHash,
                },
            });

            return result;
        } catch (error) {}
    }

    async delete(data: DeleteUserInput): Promise<User> {
        try {
            const result = await this.prisma.user.delete({
                where: {
                    id: data.id,
                },
            });

            return result;
        } catch (error) {
            throw error;
        }
    }

    async createFolderByCurrent(id: number, data: CreateFolderInput): Promise<Folder> {
        try {
            const result = await this.prisma.folder.create({
                data: {
                    userId: id,
                    name: data.name,
                },
            });

            return result;
        } catch (error) {
            throw error;
        }
    }
}
