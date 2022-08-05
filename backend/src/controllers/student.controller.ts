import { Controller, Get } from '@nestjs/common'
import { StudentDto } from 'src/dtos/student.dto'
import { StudentService } from 'src/services/student.service'

@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService) {}

    @Get()
    async findAll(): Promise<StudentDto[]> {
        return []
    }
}
