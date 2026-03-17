import { Component } from '@angular/core';
import { LayoutListChat } from "../../components/layout-list-chat/layout-list-chat";
import { LayoutChat } from "../../components/layout-chat/layout-chat";

@Component({
  selector: 'app-home',
  imports: [LayoutListChat, LayoutChat],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
