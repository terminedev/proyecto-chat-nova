import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Contact } from '../../models/contact.interface';

@Component({
  selector: 'app-list-chat',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './list-chat.html',
  styleUrl: './list-chat.css',
})
export class ListChat {

  @Input({ required: true }) contacts: Contact[] = [];
  @Output() delete = new EventEmitter<string>();

  constructor() { };

  onDelete(event: Event, id: string) {
    event.preventDefault();
    event.stopPropagation();
    this.delete.emit(id);
  }
}