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
                messageText: '¡Nova! ¡Por fin contacto contigo!',
                messageImg: null,
              },
              {
                author: 'Iko Ukonwada',
                date: new Date().toISOString(),
                messageText: 'Nos están obligando a utilizar esta extraña aplicación debido a las amenazas en la Academia Mágica. Así que debemos estar todos en contacto...',
                messageImg: null,
              },
              {
                author: 'Iko Ukonwada',
                date: new Date().toISOString(),
                messageText: 'Yo estoy con Rinna en el palacio de mi tía; cualquier cosa, háblame.',
                messageImg: 'chats/iko-photo-palacio.png',
              }
            ]
          },
          {
            id: '67dfKMK4mD',
            messages: [
              {
                author: 'Soraya Darkworth',
                date: new Date(Date.now() - 86400000).toISOString(),
                messageText: 'Hermano, será mejor que tengas cuidado con quién hablas. Los Magos Oscuros están cada vez más presentes.',
                messageImg: null,
              },
              {
                author: 'Soraya Darkworth',
                date: new Date(Date.now() - 86400000).toISOString(),
                messageText: 'Puedes añadir un nuevo contacto pulsando en el botón "+ Agregar nuevo contacto" en la lista de contactos generales.',
                messageImg: null,
              }
              ,
              {
                author: 'Soraya Darkworth',
                date: new Date(Date.now() - 86400000).toISOString(),
                messageText: 'Deberás añadir el nombre del contacto (requerido) y su número (más de ocho caracteres).',
                messageImg: null,
              },
              {
                author: 'Soraya Darkworth',
                date: new Date(Date.now() - 86400000).toISOString(),
                messageText: 'Como sea, estaré rodeando la Academia por si hay algún intercambio. Hablamos después.',
                messageImg: null,
              }
            ]
          },
          {
            id: '0887ascGDG',
            messages: [
              {
                author: 'Gema',
                date: new Date(Date.now() - (45 * 60 * 1000)).toISOString(),
                messageText: '¡Cariño!, estoy terminando mi última serie de entrenamiento diario. Es una pena que no hayas podido venir.',
                messageImg: '',
              },
              {
                author: 'Gema',
                date: new Date(Date.now() - (45 * 60 * 1000)).toISOString(),
                messageText: 'Intento enviarte una foto duchándome, pero esta extraña aplicación no permite ese tipo de contenido.',
                messageImg: 'chats/no-image.png',
              },
              {
                author: 'Gema',
                date: new Date(Date.now() - (45 * 60 * 1000)).toISOString(),
                messageText: 'En fin, nos veremos en casa ♡',
                messageImg: '',
              },
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
