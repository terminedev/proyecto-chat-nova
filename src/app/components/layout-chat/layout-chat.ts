import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.interface';
import { ContactService } from '../../services/contact-service';
import { ChatView } from "../chat-view/chat-view";
import { ChatService } from '../../services/chat-service';

@Component({
  selector: 'app-layout-chat',
  imports: [ChatView],
  templateUrl: './layout-chat.html',
  styleUrl: './layout-chat.css',
  standalone: true,
})
export class LayoutChat implements OnInit {
  contact: Contact | undefined;

  constructor(private contactService: ContactService, private chatService: ChatService) { };

  ngOnInit(): void {
    this.contactService.initDefaultContacts();
    this.chatService.initDefaultChats();

    const contacts = this.contactService.getContacts();
    this.contact = contacts.find(c => c.id === '12sdvDSAF3');

    if (!this.contact) {
      console.warn("No se encontró el contacto con el ID especificado.");
    }
  }
}