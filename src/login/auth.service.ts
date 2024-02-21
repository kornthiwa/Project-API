import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'; 

@Injectable()
export class AuthService {
  async generateToken(user: any) {
    // Generate a random 32-byte secret key
    const secretKey = 'Ford'; // Replace with your secure secret key

    // Generate a JWT token with user ID and expiration time
    const token = jwt.sign(
      { id: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 }, // Set appropriate expiration time
      secretKey,
    );

    return token;
  }
}
