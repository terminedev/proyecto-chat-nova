import { Injectable } from '@angular/core';
import { Chat, Message } from '../models/chat.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  private readonly STORAGE_KEY = 'chatsInLocalStorage';

  constructor() { };

  // Obtener chat:
  getChat(id: string): Chat | null {
    try {
      const rawChats = localStorage.getItem(this.STORAGE_KEY);

      if (!rawChats) return null;

      const chats: Chat[] = JSON.parse(rawChats);

      return chats.find(chat => chat.id === id) ?? null;

    } catch (error) {

      console.error("Error al obtener los chats de localStorage:", error);
      return null;

    }
  };

  // Añadir nuevo mensaje: 
  addNewMessage(newMessage: Message, chatId: string): boolean {
    try {
      const storedChats = localStorage.getItem(this.STORAGE_KEY);

      if (!storedChats) return false;

      const chats: Chat[] = JSON.parse(storedChats);

      const chatIndex = chats.findIndex(chat => chat.id === chatId);

      if (chatIndex === -1) return false;

      chats[chatIndex].messages.push(newMessage);

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(chats));

      return true;

    } catch (error) {
      console.error("Error al añadir el mensaje al localStorage:", error);
      return false;

    }
  };


}
