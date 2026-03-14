import { Component, signal } from '@angular/core';
import { ChatView } from "./components/chat-view/chat-view";

@Component({
  selector: 'app-root',
  imports: [ChatView],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('nova-chat-proyect');
}
