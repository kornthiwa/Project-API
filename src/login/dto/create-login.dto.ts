import { IsNotEmpty, IsString, Length, IsEnum } from 'class-validator';
import { UserRole } from '../entities/login.entity';

export class CreateLoginDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lname: string;

  @IsEnum(UserRole)
  readonly role: UserRole;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
