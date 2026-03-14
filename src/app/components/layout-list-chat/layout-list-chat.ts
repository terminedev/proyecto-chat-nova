import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs';
import { ListChat } from "../list-chat/list-chat";
import { ContactService } from '../../services/contact-service';
import { Contact } from '../../models/contact.interface';

@Component({
  selector: 'app-layout-listchat',
  standalone: true,
  imports: [ReactiveFormsModule, ListChat],
  templateUrl: './layout-list-chat.html',
  styleUrl: './layout-list-chat.css'
})
export class LayoutListChat implements OnInit {
  searchForm: FormGroup;
  contacts: Contact[] = [];

  constructor(
    private fb: FormBuilder,
    private destroyRef: DestroyRef,
    private contactService: ContactService
  ) {
    this.searchForm = this.fb.group({
      searchQuery: ['', [
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]]
    });
  }

  ngOnInit(): void {
    this.contactService.initDefaultContacts();
    this.contacts = this.contactService.getContacts();

    this.searchForm.get('searchQuery')?.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(value => {
        if (this.searchForm.valid || !value) {
          this.performSearch(value || '');
        }
      });
  }

  // Realizar busqueda
  performSearch(query: string) {
    this.contacts = this.contactService.searchContact(query);
  }

  get searchQuery() {
    return this.searchForm.get('searchQuery');
  }
}