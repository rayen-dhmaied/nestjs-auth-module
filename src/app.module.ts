import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HelloModule } from './hello/hello.module';


@Module({
  imports: [AuthModule, UsersModule, HelloModule],
})
export class AppModule {}
