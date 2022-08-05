import { Module } from '@nestjs/common'
import { StudentController } from './controllers/student.controller'
import { PrismaService } from './services/prisma.service'
import { StudentService } from './services/student.service'

@Module({
    controllers: [StudentController],
    providers: [StudentService, PrismaService]
})
export class AppModule {}
