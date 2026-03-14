import { Injectable } from '@angular/core';
import { Contact, ContactInputs } from '../models/contact.interface';


@Injectable({
  providedIn: 'root',
})
export class ContactService {

  private readonly STORAGE_KEY = 'contactsInLocalStorage';

  constructor() { }

  // Obtener todos los contactos:
  getContacts(): Contact[] {
    const rawData = localStorage.getItem(this.STORAGE_KEY);

    if (!rawData) return [];

    try {

      const contacts: Contact[] = JSON.parse(rawData);

      return contacts;

    } catch (error) {

      console.error("Error al parsear los contactos del localStorage:", error);
      return [];

    }
  }


  // Buscar contacto:
  searchContact(query: string): Contact[] {
    try {
      const storedContacts = localStorage.getItem(this.STORAGE_KEY);

      if (!storedContacts) return [];

      const contacts: Contact[] = JSON.parse(storedContacts);

      if (!query) return contacts;

      const lowerCaseQuery = query.toLowerCase();

      return contacts.filter(contact => {
        return contact.name?.toLowerCase().includes(lowerCaseQuery);
      });

    } catch (error) {
      console.error('Error al leer o parsear los contactos del localStorage:', error);
      return [];
    }
  }

  // Agregar nuevo contacto:
  addNewContact(input: ContactInputs): boolean {

    try {
      const storedData = localStorage.getItem(this.STORAGE_KEY);
      const contacts: Contact[] = storedData ? JSON.parse(storedData) : [];

      const newContact: Contact = {
        id: crypto.randomUUID(),
        //Incluir avatar img por defecto
        avatarUrl: '',
        name: input.name,
        phone: input.phone,
        online: true,
        //Los nuevos contactos siempre estarán en linea
        lastConnection: '',
        currentLocation: 'Academia Mágica',
        idChat: crypto.randomUUID()
      };

      contacts.push(newContact);
      localStorage.setItem('contactsInLocalStorage', JSON.stringify(contacts));
      return true;

    } catch (error) {

      console.error('Error al leer o parsear los contactos del localStorage:', error);
      return false;
    }
  };

}