import { Injectable } from '@angular/core';
import { Chat, Message } from '../models/chat.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  private readonly STORAGE_KEY = 'chatsInLocalStorage';

  private chatUpdatedSource = new Subject<string>();
  chatUpdated$ = this.chatUpdatedSource.asObservable();

  constructor() { };

  // Obtener chat:
  getChat(contactId: string): Chat | null {
    try {
      const rawChats = localStorage.getItem(this.STORAGE_KEY);

      if (!rawChats) return null;

      const chats: Chat[] = JSON.parse(rawChats);
      console.log(chats)
      console.log(contactId)
      return chats.find(chat => chat.id === contactId) ?? null;



    } catch (error) {

      console.error("Error al obtener los chats de localStorage:", error);
      return null;

    }
  };

  // Añadir nuevo mensaje: 
  addNewMessage(newMessage: Message, chatId: string): boolean {
    try {
      const storedChats = localStorage.getItem(this.STORAGE_KEY);
      // Si no hay nada, inicializamos con un array vacío
      let chats: Chat[] = storedChats ? JSON.parse(storedChats) : [];

      let chatIndex = chats.findIndex(chat => chat.id === chatId);

      if (chatIndex === -1) {
        // SI NO EXISTE EL CHAT, LO CREAMOS
        const newChat: Chat = {
          id: chatId,
          messages: []
        };
        chats.push(newChat);
        chatIndex = chats.length - 1;
      }

      // Ahora sí, insertamos el mensaje
      chats[chatIndex].messages.push(newMessage);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(chats));

      this.chatUpdatedSource.next(chatId);
      return true;
    } catch (error) {
      console.error("Error al añadir el mensaje:", error);
      return false;
    }
  }

  // Incluir chats por defecto:
  initDefaultChats(): void {
    const storedData = localStorage.getItem(this.STORAGE_KEY);

    try {
      if (!storedData || JSON.parse(storedData).length === 0) {

        const defaultChats: Chat[] = [
          {
            id: '12sdvDSAF3',
            messages: [
              {
                author: 'Iko Ukonwada',
                date: new Date().toISOString(),
                messageText: '¡Hola! Te escribo desde el Palacio Real. ¿Cómo va todo?',
                messageImg: null,
              },
              {
                author: 'Me',
                date: new Date().toISOString(),
                messageText: '¡Todo excelente por aquí, Iko!',
                messageImg: null,
              }
            ]
          },
          {
            id: '67dfKMK4mD',
            messages: [
              {
                author: 'Soraya Darkworth',
                date: '2023-10-20T14:30:00.000Z',
                messageText: 'Tengo información confidencial. No le digas a nadie.',
                messageImg: null,
              }
            ]
          },
          {
            id: '0887ascGDG',
            messages: [
              {
                author: 'Gema',
                date: '2023-10-26T09:15:00.000Z',
                messageText: 'Terminé mi rutina de hoy, mira cómo quedó el equipo nuevo:',
                messageImg: 'https://picsum.photos/seed/gym/400/300',
              },
              {
                author: 'Me',
                date: '2023-10-26T09:20:00.000Z',
                messageText: '¡Se ve genial! Nos vemos más tarde.',
                messageImg: null,
              }
            ]
          },
        ];

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(defaultChats));
      }
    } catch (error) {
      console.error('Error al leer y establecer la carga inicial de los chats:', error);
    }
  }

}
