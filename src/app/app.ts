import { Component, signal } from '@angular/core';
import { ChatView } from "./components/chat-view/chat-view";
import { LayoutChat } from "./components/layout-chat/layout-chat";
import { InputChat } from "./components/input-chat/input-chat";

@Component({
  selector: 'app-root',
  imports: [ChatView, LayoutChat, InputChat],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('nova-chat-proyect');
}
