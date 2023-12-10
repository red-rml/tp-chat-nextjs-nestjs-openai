import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { OpenAIModule } from 'nestjs-openai';

@Module({
  imports: [OpenAIModule.register({
    apiKey: process.env.OPENAI_API_KEY ?? 'clé API openAI',
  })],
  providers: [ChatGateway, ChatService],
})
export class ChatModule { }
