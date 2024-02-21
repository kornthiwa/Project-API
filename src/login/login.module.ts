import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Login, LoginSchema } from './entities/login.entity';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Login.name, schema: LoginSchema }]),
  ],
  controllers: [LoginController],
  providers: [AuthService, LoginService],
})
export class LoginModule {}
