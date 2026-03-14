import { Component, signal } from '@angular/core';
import { ChatView } from "./components/chat-view/chat-view";
import { LayoutChat } from "./components/layout-chat/layout-chat";

@Component({
  selector: 'app-root',
  imports: [ChatView, LayoutChat],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('nova-chat-proyect');
}
