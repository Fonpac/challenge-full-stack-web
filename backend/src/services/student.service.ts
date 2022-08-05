import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { Student, Prisma } from '@prisma/client'
import { CreateStudentDto, UpdateStudentDto } from 'src/dtos/student.dto'

@Injectable()
export class StudentService {
    constructor(private prisma: PrismaService) {}

    getAll(): Promise<Student[]> {
        return this.prisma.student.findMany()
    }

    getById(id: number): Promise<Student | null> {
        return this.prisma.student.findUnique({ where: { id } })
    }

    create(data: CreateStudentDto): Promise<Student> {
        return this.prisma.student.create({ data })
    }

    update(id: number, data: UpdateStudentDto): Promise<Student> {
        return this.prisma.student.update({
            where: { id },
            data
        })
    }

    delete(id: number): Promise<Student> {
        return this.prisma.student.delete({ where: { id } })
    }
}
