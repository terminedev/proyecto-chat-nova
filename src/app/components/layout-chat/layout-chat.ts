import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.interface';
import { ContactService } from '../../services/contact-service';
import { ChatView } from "../chat-view/chat-view";
import { ChatService } from '../../services/chat-service';
import { InputChat } from "../input-chat/input-chat";
import { Message } from '../../models/chat.interface';

@Component({
  selector: 'app-layout-chat',
  imports: [ChatView, InputChat],
  templateUrl: './layout-chat.html',
  styleUrl: './layout-chat.css',
  standalone: true,
})
export class LayoutChat implements OnInit {
  contact: Contact | undefined;
  isTyping: boolean = false;

  @Input() id!: string;

  // Diccionario con 5 respuestas aleatorias por ID de contacto
  private randomRepliesMap: { [key: string]: string[] } = {
    '12sdvDSAF3': [ // Iko Ukonwada
      '¡Qué interesante!',
      '¿En serio? Cuéntame más.',
      'Jaja, me parece genial.',
      'Déjame revisarlo y te digo.',
      '¡Exacto! Así mismo es.'
    ]
  };

  // Respuestas por defecto por si agregas un contacto nuevo y no está en el diccionario
  private defaultReplies: string[] = [
    '¡Hola!', 'Vale, entiendo.', 'Claro que sí.', 'Me parece perfecto.', 'Hablamos luego.'
  ];

  constructor(
    private contactService: ContactService,
    private chatService: ChatService
  ) { };

  ngOnInit(): void {
    this.contactService.initDefaultContacts();
    this.chatService.initDefaultChats();

    const contacts = this.contactService.getContacts();
    this.contact = contacts.find(c => {
      console.log(`Comparando: "${c.id}" con "${this.id}"`);
      return c.id.trim() === this.id.trim();
    });

    if (!this.contact) {
      console.warn("No se encontró el contacto con el ID especificado.");
    }
  }

  onNewMessage(text: string): void {
    if (!this.contact) return;

    const userMessage: Message = {
      author: 'Me',
      date: new Date().toISOString(),
      messageText: text,
      messageImg: null,
    };

    const success = this.chatService.addNewMessage(userMessage, this.contact.id);

    if (success) {
      this.triggerBotReply(this.contact);
    } else {
      console.error("Hubo un error al guardar el mensaje.");
    }
  }

  private triggerBotReply(contact: Contact): void {
    const replies = this.randomRepliesMap[contact.id] || this.defaultReplies;

    const randomIndex = Math.floor(Math.random() * replies.length);
    const randomText = replies[randomIndex];

    const delay = Math.floor(Math.random() * 500) + 1500;
    this.isTyping = true;

    setTimeout(() => {
      const replyMessage: Message = {
        author: contact.name,
        date: new Date().toISOString(),
        messageText: randomText,
        messageImg: null,
      };

      this.isTyping = false;

      this.chatService.addNewMessage(replyMessage, contact.id);

    }, delay);
  }
}