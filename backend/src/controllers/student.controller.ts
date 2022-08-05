import { Delete } from '@nestjs/common'
import { Body, Controller, Get, Post, Param, Patch } from '@nestjs/common'
import { Student } from '@prisma/client'
import { CreateStudentDto, StudentDto, UpdateStudentDto } from '../dtos/student.dto'
import { StudentService } from '../services/student.service'

@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService) {}

    @Get()
    async getAll(): Promise<StudentDto[]> {
        let students: Student[] = await this.studentService.getAll()

        return students.map((student) => new StudentDto(student))
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<StudentDto> {
        let student: Student = await this.studentService.getById(Number(id))

        return new StudentDto(student)
    }

    @Post()
    async createStudent(@Body() createStudentDto: CreateStudentDto): Promise<StudentDto> {
        let newStudent: Student = await this.studentService.create(createStudentDto)

        return new StudentDto(newStudent)
    }

    @Patch(':id')
    async updateStudent(
        @Param('id') id: string,
        @Body() updateStudentDto: UpdateStudentDto
    ): Promise<StudentDto> {
        let updatedStudent: Student = await this.studentService.update(Number(id), updateStudentDto)

        return new StudentDto(updatedStudent)
    }

    @Delete(':id')
    async deleteStudent(@Param('id') id: string): Promise<Student> {
        let deletedStudent: Student = await this.studentService.delete(Number(id))

        return new StudentDto(deletedStudent)
    }
}
