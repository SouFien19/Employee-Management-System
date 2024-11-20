import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.schema'; // Adjust based on your User entity path

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string, role: string): Promise<User> {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.createUser(name, email, hashedPassword, role);
  }

// auth.service.ts
async login(email: string, password: string): Promise<{ access_token: string; user: User }> {
  const user = await this.userService.findByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const payload = { user: user };
  return { 
    access_token: this.jwtService.sign(payload), 
    user // Include the user object in the response
  };
}
}
