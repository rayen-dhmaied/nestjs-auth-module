import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Module({
  imports:[UsersModule, PassportModule, JwtModule.register({
    secret : "secretphrase", //In a real application, store this in a secure place such environment variables!
    signOptions: { expiresIn: "1800s" } // expiresIn refers to token duration before expiring, I recommend storing it with the secret so everything is organized.
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy,
    //This enables authentification globally, if you want to use authentification on specific routes delete this and user the JwtAuthGuard on your desired routes.
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },]
})
export class AuthModule {}
