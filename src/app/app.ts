import { Component, signal } from '@angular/core';
import { LayoutChat } from "./components/layout-chat/layout-chat";

@Component({
  selector: 'app-root',
  imports: [LayoutChat],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('nova-chat-proyect');
}
