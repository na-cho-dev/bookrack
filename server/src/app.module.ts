import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { EnvConfig } from './common/config/env.config';
import { BookModule } from './book/book.module';
import { BorrowBookModule } from './borrow-book/borrow-book.module';
import { OrganizationModule } from './organization/organization.module';
import { MembershipModule } from './membership/membership.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      ignoreEnvFile: false,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    AuthModule,
    UserModule,
    BookModule,
    BorrowBookModule,
    OrganizationModule,
    MembershipModule,
  ],
  controllers: [AppController],
  providers: [AppService, EnvConfig],
  exports: [EnvConfig],
})
export class AppModule {}
