import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalenderModule } from './calender/calender.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Calender } from './calender/entities/calender.entity';

@Module({
  imports: [
    CalenderModule,
    ConfigModule.forRoot({
      isGlobal: true,
      //nvFilePath: `.env.${process.env.NODE_ENV}`,
      envFilePath: '.env.development',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          entities: [Calender],
          synchronize: true,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
