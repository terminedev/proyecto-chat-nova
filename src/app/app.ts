import { Component, signal } from '@angular/core';
import { LayoutListChat } from "./components/layout-list-chat/layout-list-chat";

@Component({
  selector: 'app-root',
  imports: [LayoutListChat],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('nova-chat-proyect');
}
