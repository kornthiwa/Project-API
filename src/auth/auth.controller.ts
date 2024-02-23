import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Method สำหรับการลงชื่อเข้าใช้
  @HttpCode(HttpStatus.OK) // กำหนด HTTP status code ให้กับ response ที่ส่งกลับเป็น HttpStatus.OK (200)
  @Post('login') // กำหนดว่าเป็น HTTP POST request ที่เส้นทาง /auth/login
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  // Method สำหรับการเข้าถึงข้อมูลโปรไฟล์ของผู้ใช้ที่ยืนยันตัวตน
  @UseGuards(AuthGuard) // ใช้ AuthGuard เพื่อตรวจสอบความถูกต้องของ token ใน header
  @Get('profile') // กำหนดว่าเป็น HTTP GET request ที่เส้นทาง /auth/profile
  getProfile(@Request() req) {
    return req.user; // ส่งข้อมูลผู้ใช้ที่ยืนยันตัวตนกลับไป
  }
}
