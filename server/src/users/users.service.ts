import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Utility to remove password from user object
  private excludePassword(user: any) {
    if (!user) return user;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async create(data: Prisma.UserCreateInput) {
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('Email đã tồn tại trong hệ thống');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    return this.excludePassword(user);
  }

  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit;

    const whereClause: Prisma.UserWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      this.prisma.user.count({ where: whereClause }),
    ]);

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('Tài khoản không tồn tại');
    }
    return this.excludePassword(user);
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Tài khoản không tồn tại');
    }

    const updateData: any = { ...data };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password as string, 10);
    }

    // Check if updating email to one that already exists
    if (data.email && data.email !== user.email) {
      const emailExists = await this.findByEmail(data.email as string);
      if (emailExists) {
        throw new ConflictException('Email đã tồn tại trong hệ thống');
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateData,
    });
    return this.excludePassword(updatedUser);
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Tài khoản không tồn tại');
    }

    if (user.role === Role.SUPER_ADMIN) {
      const superAdminsCount = await this.prisma.user.count({
        where: { role: Role.SUPER_ADMIN },
      });
      if (superAdminsCount <= 1) {
        throw new ConflictException(
          'Không thể xóa SUPER_ADMIN cuối cùng của hệ thống',
        );
      }
    }

    await this.prisma.user.delete({
      where: { id },
    });
    return { success: true, message: 'Tài khoản đã được xóa' };
  }
}
