import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { ContactAppComponent } from './pages/contact-app/contact-app.component';
import { ContactAppHeaderComponent } from './cmps/contact/contact-app-header/contact-app-header.component';
import { ContactListComponent } from './cmps/contact/contact-list/contact-list.component';
import { ContactFilterComponent } from './cmps/contact/contact-filter/contact-filter.component';
import { ContactPreviewComponent } from './cmps/contact/contact-preview/contact-preview.component';
import { ChatHeaderComponent } from './cmps/chat/chat-header/chat-header.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatFooterComponent } from './cmps/chat/chat-footer/chat-footer.component';
import { MessageListComponent } from './cmps/chat/message-list/message-list.component';
import { MessagePreviewComponent } from './cmps/chat/message-preview/message-preview.component';
import { SignComponent } from './pages/sign/sign.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VideoCallComponent } from './cmps/video-call/video-call.component';
@NgModule({
  declarations: [
    AppComponent,
    ContactAppComponent,
    ContactAppHeaderComponent,
    ContactListComponent,
    ContactFilterComponent,
    ContactPreviewComponent,
    ChatHeaderComponent,
    ChatComponent,
    ChatFooterComponent,
    MessageListComponent,
    MessagePreviewComponent,
    SignComponent,
    VideoCallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
