import { Student } from '@prisma/client'
import { CreateStudentDto, StudentDto, UpdateStudentDto } from '../../src/dtos/student.dto'

export let mockStudentList: Student[] = [
    {
        id: 1,
        name: 'test-name-1',
        email: 'test-email-1',
        ra: 'test-ra-1',
        cpf: 'test-cpf-1'
    },
    {
        id: 2,
        name: 'test-name-2',
        email: 'test-email-2',
        ra: 'test-ra-2',
        cpf: 'test-cpf-2'
    }
]

export const mockPrisma = {
    student: {
        findMany: () => mockStudentList,
        findUnique: ({ where }) => {
            return mockStudentList.find((student) => student.id == where.id)
        },
        create: ({ data }) => {
            let newId = mockStudentList[mockStudentList.length - 1].id + 1

            let toCreate = { id: newId, ...data }

            mockStudentList.push(toCreate)

            return toCreate
        },
        update: ({ where, data }) => {
            let found = mockStudentList.find((student) => student.id == where.id)
            if (data.email) {
                found.email = data.email
            }
            if (data.name) {
                found.name = data.name
            }
            return found
        },
        delete: ({ where }) => {
            let index = mockStudentList.findIndex((student) => student.id == where.id)
            let deleted = mockStudentList[index]
            mockStudentList = mockStudentList.splice(index, 1)
            return deleted
        }
    }
}
