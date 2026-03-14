import { Component, signal } from '@angular/core';
import { ListChat } from "./components/list-chat/list-chat";
import { LayoutListChat } from "./components/layout-list-chat/layout-list-chat";

@Component({
  selector: 'app-root',
  imports: [ListChat, LayoutListChat],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('nova-chat-proyect');
}
