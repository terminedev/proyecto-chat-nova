import { Component, Input } from '@angular/core';
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

  constructor() { };
}