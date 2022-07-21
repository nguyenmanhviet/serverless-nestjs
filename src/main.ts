import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/serverless';
import serverlessExpress from '@vendia/serverless-express';
import { APIGatewayEvent, APIGatewayProxyHandler, Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: APIGatewayProxyHandler = Sentry.AWSLambda.wrapHandler(
  async (event: APIGatewayEvent, context: Context, callback: Callback,) => {
    server = await bootstrap();
    return server(event, context, callback);
  }
);