import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductsModule, 
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
