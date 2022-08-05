import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    // SWAGGER CONFIG
    const config = new DocumentBuilder().setTitle('A+ Student API').setVersion('1.0').build()
    const options: SwaggerDocumentOptions = {}

    const document = SwaggerModule.createDocument(app, config, options)
    SwaggerModule.setup('api', app, document)

    await app.listen(3000)
    console.info(`Application is running on: ${await app.getUrl()}`)
    console.info(`Swagger is running on: ${await app.getUrl()}/api`)
}
bootstrap()
