import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-chat',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input-chat.html',
  styleUrls: ['./input-chat.css']
})
export class InputChat {
  @Output() sendMessage = new EventEmitter<string>();
  messageControl = new FormControl('', [Validators.required, Validators.minLength(1)]);

  onSend() {
    if (this.messageControl.valid && this.messageControl.value) {
      this.sendMessage.emit(this.messageControl.value);
      this.messageControl.reset('');
    }
  }
  clearMessage() {
    this.messageControl.reset('');
  }
}
