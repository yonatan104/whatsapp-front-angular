import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { ContactAppComponent } from './pages/contact-app/contact-app.component'
import { SignComponent } from './pages/sign/sign.component';


const routes: Routes = [
  { path: '', component: SignComponent },
  // { path: 'contact', component: ContactAppComponent },
  // { path: 'contact/:id', component: ContactAppComponent },
  {
    path: 'contact', component: ContactAppComponent,
    children: [
      { path: ':id', component: ChatComponent }
    ],}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
