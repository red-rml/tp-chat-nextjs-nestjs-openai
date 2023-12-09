import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from '../config/configuration';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] }), ChatModule],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule { }
