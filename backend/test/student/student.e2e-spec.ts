import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../../src/app.module'
import { CreateStudentDto, StudentDto, UpdateStudentDto } from '../../src/dtos/student.dto'
import { StudentController } from '../../src/controllers/student.controller'
import { StudentService } from '../../src/services/student.service'
import { PrismaService } from '../../src/services/prisma.service'
import { mockPrisma } from './mockData'

describe('StudentController (e2e)', () => {
    let app: INestApplication
    const getId = 1
    const updateId = 1
    const deleteId = 2

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            controllers: [StudentController],
            providers: [StudentService, PrismaService]
        })
            .overrideProvider(PrismaService)
            .useValue(mockPrisma)
            .compile()

        app = moduleFixture.createNestApplication()

        await app.init()
    })

    it('/student (GET)', async () => {
        const response = await request(app.getHttpServer()).get('/student')

        const studentList: StudentDto[] = response.body

        expect(studentList).toBeDefined()

        expect(studentList[0].name).toBeDefined()
        expect(studentList[0].email).toBeDefined()
        expect(studentList[0].ra).toBeDefined()
        expect(studentList[0].cpf).toBeDefined()
    })

    it('/student (POST)', async () => {
        const newStudent: CreateStudentDto = {
            name: 'test',
            email: 'test',
            ra: 'test',
            cpf: 'test'
        }

        const response = await request(app.getHttpServer())
            .post('/student')
            .send({ ...newStudent })

        let cretedStudent: StudentDto = response.body

        expect(cretedStudent).toBeDefined()
        expect(cretedStudent.name).toEqual(newStudent.name)
        expect(cretedStudent.email).toEqual(newStudent.email)
        expect(cretedStudent.ra).toEqual(newStudent.ra)
        expect(cretedStudent.cpf).toEqual(newStudent.cpf)
    })

    it('/student/:id (GET)', async () => {
        const response = await request(app.getHttpServer()).get('/student/' + getId)

        const student: StudentDto = response.body

        expect(student).toBeDefined()

        expect(student.id).toEqual(getId)
        expect(student.name).toBeDefined()
        expect(student.email).toBeDefined()
        expect(student.ra).toBeDefined()
        expect(student.cpf).toBeDefined()
    })

    it('/student/:id (PATCH)', async () => {
        const studentToUpdate: UpdateStudentDto = {
            name: 'test-update',
            email: 'test-update'
        }

        const response = await request(app.getHttpServer())
            .patch('/student/' + updateId)
            .send({ ...studentToUpdate })

        let updatedStudent: StudentDto = response.body

        expect(updatedStudent).toBeDefined()
        expect(updatedStudent.id).toEqual(updateId)
        expect(updatedStudent.name).toEqual(studentToUpdate.name)
        expect(updatedStudent.email).toEqual(studentToUpdate.email)
    })

    it('/student/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer()).delete('/student/' + deleteId)

        let deletedStudent: StudentDto = response.body

        expect(deletedStudent).toBeDefined()
        expect(deletedStudent.id).toEqual(deleteId)
        expect(deletedStudent.name).toBeDefined()
        expect(deletedStudent.email).toBeDefined()
        expect(deletedStudent.ra).toBeDefined()
        expect(deletedStudent.cpf).toBeDefined()
    })
})
