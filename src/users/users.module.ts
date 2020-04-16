import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from './user.repository';


@Module({
  imports: [
    // forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Users]),
    // AuthModule,
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [UsersService ],
  controllers: [UsersController],
  exports: [
    TypeOrmModule,
    UsersService
  ]
  
})
export class UsersModule {}
