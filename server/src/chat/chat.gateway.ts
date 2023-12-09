import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Socket } from 'socket.io';
import { ChatService } from './chat.service';

export type Message = { id: string; message: string, owner: string, reliability: string }
export type Messages = Message[]

@WebSocketGateway({
  cors: true,
})
export class ChatGateway {
  @WebSocketServer()
  server: Socket;

  constructor(
    private chatService: ChatService
  ) {
  }

  @SubscribeMessage('messages-update')
  async messageUpdate(@MessageBody() data: { messages: Messages, index: number, message: string }, @ConnectedSocket() client: Socket) {
    const messageCheck = await this.chatService.checkMessageReliability(data.message)
    const helpMessage = await this.chatService.helpMessage(data.messages)

    data.messages[data.index].reliability = messageCheck

    client.emit('messages-update', { messages: data.messages, help: '' })
    client.broadcast.emit('messages-update', { messages: data.messages, help: helpMessage })
  }

  @SubscribeMessage('translation')
  async translation(@MessageBody() data: { messages: Messages, index: number, message: string, lng: string }, @ConnectedSocket() client: Socket) {
    const messageTranlsated = await this.chatService.translateMessage(data.message, data.lng)
    data.messages[data.index].message = messageTranlsated

    client.emit('translated', data.messages)
  }

}
