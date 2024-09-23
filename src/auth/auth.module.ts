import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module'; 

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret', // Make sure to set this properly
      signOptions: { expiresIn: '60s' }, // Set expiration time as needed
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
