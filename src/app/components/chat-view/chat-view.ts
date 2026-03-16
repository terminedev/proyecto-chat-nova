import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat-service';
import { Chat } from '../../models/chat.interface';

@Component({
  selector: 'app-chat-view',
  imports: [CommonModule],
  templateUrl: './chat-view.html',
  styleUrl: './chat-view.css',
  standalone: true,
})
export class ChatView implements OnInit {

  @Input({ required: true }) contactId!: string;

  chat: Chat | null = null;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chat = this.chatService.getChat(this.contactId);

    if (!this.chat) {
      console.warn("No se encontraron mensajes para este contacto.");
    }
  }
}