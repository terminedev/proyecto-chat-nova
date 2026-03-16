import { Injectable } from '@angular/core';
import { Contact, ContactInputs } from '../models/contact.interface';


@Injectable({
  providedIn: 'root',
})
export class ContactService {

  private readonly STORAGE_KEY = 'contactsInLocalStorage';

  constructor() { };

  // Obtener todos los contactos:
  getContacts(): Contact[] {
    const rawData = localStorage.getItem(this.STORAGE_KEY);

    if (!rawData) return [];

    try {

      const contacts: Contact[] = JSON.parse(rawData);

      return contacts;

    } catch (error) {

      console.error("Error al obtener todos los contactos del localStorage:", error);
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

      if (contacts.length >= 7) {
        console.warn('Has alcanzado el límite máximo de contactos.');
        return false;
      };

      const newContact: Contact = {
        id: crypto.randomUUID(),
        //Incluir avatar img por defecto
        avatarUrl: '',
        name: input.name,
        phone: input.phone,
        online: true,
        //Los nuevos contactos siempre estarán en linea
        lastConnection: '',
        location: 'Academia Mágica',
        idChat: crypto.randomUUID(),
        //Sólo los contactos creados pueden eliminarse
        canBeDeleted: true
      };

      contacts.push(newContact);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contacts));
      return true;

    } catch (error) {

      console.error('Error al añadir un nuevo contacto del localStorage:', error);
      return false;
    }
  };

  // Incluir contactos por defecto:
  initDefaultContacts(): void {
    const storedData = localStorage.getItem(this.STORAGE_KEY);

    try {
      if (!storedData || JSON.parse(storedData).length === 0) {

        const defaultContacts: Contact[] = [
          {
            id: '12sdvDSAF3',
            avatarUrl: 'https://i.pravatar.cc/150?img=11',
            name: 'Iko Ukonwada',
            phone: '11345678898',
            online: true,
            lastConnection: '',
            location: 'Palacio Real',
            idChat: '1298sd23SAF3',
            canBeDeleted: false,
          },
          {
            id: '67dfKMK4mD',
            avatarUrl: 'https://i.pravatar.cc/150?img=11',
            name: 'Soraya Darkworth',
            phone: '1199843450',
            online: false,
            lastConnection: 'Ayer',
            location: 'Desconocido',
            idChat: '9880dfvFF',
            canBeDeleted: false,
          },
          {
            id: '0887ascGDG',
            avatarUrl: 'https://i.pravatar.cc/150?img=11',
            name: 'Gema',
            phone: '566434553',
            online: false,
            lastConnection: 'Hace 45 minutos',
            location: 'Ménima\'s Gym',
            idChat: '9887hjjMMG',
            canBeDeleted: false,
          },
        ];

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(defaultContacts));
      }
    } catch (error) {
      console.error('Error al leer y establecer la carga inicial:', error);
    }
  }

  // Eliminar contacto:
  deleteContact(id: string): boolean {
    try {
      const storedData = localStorage.getItem(this.STORAGE_KEY);
      if (!storedData) return false;

      let contacts: Contact[] = JSON.parse(storedData);
      const initialLength = contacts.length;

      contacts = contacts.filter(contact => !(contact.id === id && contact.canBeDeleted));

      if (contacts.length !== initialLength) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contacts));
        return true;
      }
      return false;

    } catch (error) {
      console.error('Error al eliminar un contacto del localStorage:', error);
      return false;
    }
  }

}