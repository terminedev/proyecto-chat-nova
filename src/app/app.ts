import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListChat } from "./components/list-chat/list-chat";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListChat],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('nova-chat-proyect');
}
