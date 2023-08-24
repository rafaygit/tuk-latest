import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		rawBody: true
	});

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true
		})
	);
	app.enableCors();
	app.useBodyParser('json', { limit: '10mb' });

	const config = new DocumentBuilder().setTitle('TUK').setDescription('Tailwind UI Kit Endpoints').setVersion('1.0').addBearerAuth().build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document,{
    swaggerOptions:{
      apisSorter: 'alpha',
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    }
  });
  await app.listen(3000);
}

bootstrap();
