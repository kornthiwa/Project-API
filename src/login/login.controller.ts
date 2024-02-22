import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto, LoginDto } from './dto/create-login.dto';
import { AuthService } from './auth.service';

@Controller('login')
export class LoginController {
  constructor(
    private readonly authService: AuthService,
    private readonly loginService: LoginService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const login = await this.loginService.login(
        loginDto.username,
        loginDto.password,
      );
      if (!login) {
        throw new HttpException(
          { message: 'Invalid username or password' },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const token = await this.authService.generateToken(login);
      return { login, token };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'Failed to login' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('register')
  async register(@Body() createLoginDto: CreateLoginDto) {
    try {
      const existingLogin = await this.loginService.findByUsername(
        createLoginDto.username,
      );
      if (existingLogin) {
        throw new HttpException(
          { message: 'Username already exists' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const login = await this.loginService.create(createLoginDto);

      const token = await this.authService.generateToken(login);

      return { login, token };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'Failed to create account' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.loginService.findAll();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'Failed to retrieve all logins' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
