import { Student } from '@prisma/client'

export class StudentDto {
    constructor(student: Student) {
        this.id = student.id
        this.name = student.name
        this.email = student.email
        this.ra = student.ra
        this.cpf = student.cpf
    }

    id: number
    name: string
    email: string
    ra: string
    cpf: string
}

export class CreateStudentDto {
    name: string
    email: string
    ra: string
    cpf: string
}

export class UpdateStudentDto {
    name?: string
    email?: string
}
