export class StudentDto {
    id: number
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
