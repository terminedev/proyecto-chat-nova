import { Component, Input, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Contact } from '../../models/contact.interface';
import { ContactService } from '../../services/contact-service';
import { ChatView } from "../chat-view/chat-view";
import { ChatService } from '../../services/chat-service';
import { InputChat } from "../input-chat/input-chat";
import { Message } from '../../models/chat.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-layout-chat',
  imports: [ChatView, InputChat, RouterLink],
  templateUrl: './layout-chat.html',
  styleUrl: './layout-chat.css',
  standalone: true,
})
export class LayoutChat implements OnInit {
  contact: Contact | undefined;
  isTyping: boolean = false;
  private silentContactIds: string[] = ['67dfKMK4mD', '0887ascGDG'];

  @Input() id!: string;

  private randomRepliesMap: { [key: string]: string[] } = {
    '12sdvDSAF3': [
      '¡Qué interesante!',
      '¿En serio? Cuéntame más.',
      'Jaja, me parece genial.',
      'Déjame revisarlo y te digo.',
      '¡Exacto! Así mismo es.'
    ]
  };

  private defaultReplies: string[] = [
    '¡Hola!', 'Vale, entiendo.', 'Claro que sí.', 'Me parece perfecto.', 'Hablamos luego.'
  ];

  constructor(
    private contactService: ContactService,
    private chatService: ChatService,
    private cd: ChangeDetectorRef // Inyectamos esto para mayor seguridad
  ) { };

  ngOnInit(): void {
    this.contactService.initDefaultContacts();
    this.chatService.initDefaultChats();

    const contacts = this.contactService.getContacts();
    this.contact = contacts.find(c => c.id.trim() === this.id.trim());

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
      // 2. Solo disparamos la respuesta si el ID NO está en la lista negra
      if (!this.silentContactIds.includes(this.contact.id)) {
        this.triggerBotReply(this.contact);
      } else {
        console.log(`El contacto ${this.contact.id} tiene las respuestas automáticas desactivadas.`);
      }
    }
  }

  private triggerBotReply(contact: Contact): void {
    if (this.isTyping) return;

    const replies = this.randomRepliesMap[contact.id] || this.defaultReplies;
    const randomIndex = Math.floor(Math.random() * replies.length);
    const randomText = replies[randomIndex];
    const delay = Math.floor(Math.random() * 500) + 1500;

    // Usar setTimeout con 0ms es un truco clásico y confiable 
    // para sacar el cambio del ciclo de detección de cambios actual.
    setTimeout(() => {
      this.isTyping = true;
      this.cd.detectChanges(); // Forzamos a Angular a ver el "true"
    }, 0);

    setTimeout(() => {
      const replyMessage: Message = {
        author: contact.name,
        date: new Date().toISOString(),
        messageText: randomText,
        messageImg: null,
      };

      this.isTyping = false;
      this.chatService.addNewMessage(replyMessage, contact.id);

      // Forzamos a Angular a ver el "false" después de que el bot responde
      this.cd.detectChanges();
    }, delay);
  }
}