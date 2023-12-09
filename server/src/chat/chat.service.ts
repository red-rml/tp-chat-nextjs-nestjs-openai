import { Injectable } from '@nestjs/common';
import { OpenAIService } from 'nestjs-openai';
import { Messages } from './chat.gateway';

@Injectable()
export class ChatService {
  constructor(private readonly openai: OpenAIService) {
  }

  async translateMessage(message: string, lng: string): Promise<string> {
    const language = () => {
      if (lng === 'FR') return 'français'
      else if (lng === 'GB') return 'anglais'
      else if (lng === 'PT') return 'portugais'
    }

    try {
      const { data } = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'assistant', content: `Traduit cette phrase en ${language()} : ${message}` }],
        stream: false,
      });

      return data.choices[0].message.content;
    } catch (error) {
      console.error(error.response);
    }
  }

  async checkMessageReliability(message: string): Promise<string> {
    try {
      const { data } = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: 'Tu dois vérifier la fiabilité des informations des messages, si le message semble fiable réponds uniquement par #358300, si ce n\'est pas fiable réponds uniquement par #c40c0c. S\'il n\'y a pas d\'information à vérifier réponds uniquement par transparent et si tu ne peux pas vérifier la fiabilité de l\'information réponds uniquement par #ad7000' }, { role: 'assistant', content: `Ce message est-il fiable : ${message}` }],
        stream: false,
      });

      return data.choices[0].message.content;
    } catch (error) {
      console.error(error.response);
    }
  }

  async helpMessage(messages: Messages): Promise<string> {
    const stringMessagesOnly = messages.map(mess => ({ role: 'user', content: mess.message }) as any)

    try {
      const { data } = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system', content: 'Tu dois proposer 2 réponses simples continuant la conversation amicale, séparées par un "/", avec un maximum de 5 mots'
          }, ...stringMessagesOnly],
        stream: false,
      });

      return data.choices[0].message.content;
    } catch (error) {
      console.error(error.response);
    }
  }
}
