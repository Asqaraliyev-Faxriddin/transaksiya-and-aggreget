import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  let document = new DocumentBuilder()
  .setTitle("Prisma")
  .setVersion("salom")
  .build()
  let config = SwaggerModule.createDocument(app,document)
  SwaggerModule.setup("swagger",app,config)


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
