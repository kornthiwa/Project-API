import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    // MongooseModule.forRoot(process.env.DB_URL),
    MongooseModule.forRoot(
      'mongodb+srv://mrkornthiwa:Kornthiwa@cluster0.bbkm0eg.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
})
export class MongodbModule {}
