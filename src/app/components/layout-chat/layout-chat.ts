import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.interface';
import { ContactService } from '../../services/contact-service';
import { ChatView } from "../chat-view/chat-view";
import { ChatService } from '../../services/chat-service';
import { InputChat } from "../input-chat/input-chat";
import { Message } from '../../models/chat.interface'; // <-- Asegúrate de importar Message

@Component({
  selector: 'app-layout-chat',
  imports: [ChatView, InputChat],
  templateUrl: './layout-chat.html',
  styleUrl: './layout-chat.css',
  standalone: true,
})
export class LayoutChat implements OnInit {
  contact: Contact | undefined;

  constructor(
    private contactService: ContactService,
    private chatService: ChatService
  ) { };

  ngOnInit(): void {
    this.contactService.initDefaultContacts();
    this.chatService.initDefaultChats();

    const contacts = this.contactService.getContacts();
    this.contact = contacts.find(c => c.id === '12sdvDSAF3');

    if (!this.contact) {
      console.warn("No se encontró el contacto con el ID especificado.");
    }
  }

  // --- NUEVO MÉTODO ---
  onNewMessage(text: string): void {
    // Verificamos por seguridad que el contacto exista antes de enviar
    if (!this.contact) return;

    // 1. Armamos el objeto con la estructura de tu interfaz Message
    const newMessage: Message = {
      author: 'Me',
      date: new Date().toISOString(),
      messageText: text,
      messageImg: null,
    };

    // 2. Guardamos el mensaje en el servicio pasándole el ID del contacto actual
    const success = this.chatService.addNewMessage(newMessage, this.contact.id);

    if (!success) {
      console.error("Hubo un error al guardar el mensaje.");
    }
  }
}