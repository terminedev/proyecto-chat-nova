import { Component, signal } from '@angular/core';
import { LayoutListChat } from "./components/layout-list-chat/layout-list-chat";
import { AddNewChatFormComponent } from "./components/add-new-chat-form/add-new-chat-form";

@Component({
  selector: 'app-root',
  imports: [LayoutListChat, AddNewChatFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('nova-chat-proyect');
}
