import { Body, Controller, Get, Post, Param, Patch } from '@nestjs/common'
import { Student } from '@prisma/client'
import { CreateStudentDto, StudentDto, UpdateStudentDto } from 'src/dtos/student.dto'
import { StudentService } from 'src/services/student.service'

@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService) {}

    @Get()
    async getAll(): Promise<StudentDto[]> {
        let students: Student[] = await this.studentService.getAll()

        return students.map((student) => new StudentDto(student))
    }

    @Get(':id')
    async getById(@Param('id') id: number): Promise<StudentDto> {
        let student: Student = await this.studentService.getById(id)

        return new StudentDto(student)
    }

    @Post('/create')
    async createStudent(@Body() createStudentDto: CreateStudentDto): Promise<StudentDto> {
        let newStudent: Student = await this.studentService.create(createStudentDto)

        return new StudentDto(newStudent)
    }

    @Patch(':id')
    async updateStudent(
        @Param('id') id: number,
        @Body() updateStudentDto: UpdateStudentDto
    ): Promise<StudentDto> {
        let updatedStudent: Student = await this.studentService.update(id, updateStudentDto)

        return new StudentDto(updatedStudent)
    }
}
