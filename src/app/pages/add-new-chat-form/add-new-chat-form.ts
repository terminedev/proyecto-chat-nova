import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact-service';

@Component({
  selector: 'app-add-new-chat-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-new-chat-form.html',
  styleUrls: ['./add-new-chat-form.css']
})
export class AddNewChatFormComponent {
  chatForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) {
    this.chatForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.minLength(8)
      ]]
    });
  }

  onSubmit() {

    if (this.chatForm.valid) {
      const formValues = this.chatForm.value;

      const success = this.contactService.addNewContact({
        name: formValues.name,
        phone: formValues.phone
      });

      if (success) {
        this.chatForm.reset();
        this.router.navigate(['/']);
      } else {
        console.error('Hubo un error al guardar el contacto');
      }

    } else {
      this.chatForm.markAllAsTouched();
    }
  }

  get nameControl() {
    return this.chatForm.get('name');
  }

  get phoneControl() {
    return this.chatForm.get('phone');
  }
}