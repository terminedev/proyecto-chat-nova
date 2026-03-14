import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-chat-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-new-chat-form.html',
  styleUrls: ['./add-new-chat-form.css']
})
export class AddNewChatFormComponent {
  chatForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
      console.log('Nuevo contacto a agregar:', this.chatForm.value);
      this.chatForm.reset();
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