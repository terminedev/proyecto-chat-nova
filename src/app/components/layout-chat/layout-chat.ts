import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
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

  // Mensajes de Iko
  private randomRepliesMap: { [key: string]: string[] } = {
    '12sdvDSAF3': [
      'Es todo extraño, la verdad. Pero sé que todo irá bien, ¡lo prometo!',
      '¡Si también tienes miedo, puedes venir sin problemas! ¡Aquí todos te adoran!',
      'Creo que no es necesario que lo mencione pero, ten cuidado, ¿sí? Sé que eres muy fuerte, pero aun así me preocupas.',
      'Aún no he encontrado a Akura ni a Baru, pero en cuanto lo haga les avisaré para que vengan aquí.',
      '¡Esos magos oscuros no se saldrán con la suya! Sé que la sargenta Soraya pronto encontrará una manera de solucionar todo esto.'
    ]
  };

  // Mensajes contacto random
  private defaultReplies: string[] = [
    '¿Así que tú eres aquel extranjero? Vaya, eso explica tu popularidad. ¡Qué envidia!',
    'No puedes desatarte de tu pasado, Nova. Sé que me recuerdas perfectamente; aún tenemos cosas pendientes. Te encontraré.',
    '¡¿Es cierto que la sargenta es su hermana?!',
    '¡No es justo, yo también quiero estar con ese grupo de mujeres!',
    'Mundo perfecto, Nova. No lo olvides.',
  ];

  constructor(
    private contactService: ContactService,
    private chatService: ChatService,
    private cd: ChangeDetectorRef
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

  // Enviar un nuevo mensaje al chat
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
      if (!this.silentContactIds.includes(this.contact.id)) {
        this.triggerBotReply(this.contact);
      } else {
        console.log(`El contacto ${this.contact.id} tiene las respuestas automáticas desactivadas.`);
      }
    }
  }

  // El contacto responde
  private triggerBotReply(contact: Contact): void {
    if (this.isTyping) return;

    const replies = this.randomRepliesMap[contact.id] || this.defaultReplies;
    const randomIndex = Math.floor(Math.random() * replies.length);
    const randomText = replies[randomIndex];
    const delay = Math.floor(Math.random() * 500) + 1500;

    setTimeout(() => {
      this.isTyping = true;
      this.cd.detectChanges();
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

      this.cd.detectChanges();
    }, delay);
  }
}