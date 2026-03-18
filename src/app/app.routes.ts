import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AddNewChatFormComponent } from './pages/add-new-chat-form/add-new-chat-form';
import { LayoutChat } from './components/layout-chat/layout-chat';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'agregar-contacto', component: AddNewChatFormComponent },
    { path: 'chat/:id', component: LayoutChat },

    { path: '**', redirectTo: '', pathMatch: 'full' }
];