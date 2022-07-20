import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { lastValueFrom, Observable } from 'rxjs';
import { ChatRoom } from 'src/app/models/chat-room';
import { Contact } from 'src/app/models/contact.model'
import { ChatService } from 'src/app/services/chat-room.service'
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router'
@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss']
})
export class ContactPreviewComponent implements OnInit {

  constructor(private chatService: ChatService, private contactService: ContactService, private router: Router) { }
  @Input() contact!: Contact
  chatRoom!: ChatRoom
  chatRoomId!: string
  loggedUser: Contact = this.contactService.getLoggedinUser()
  ngOnInit(): void {
  }
  async enterChatRoom() {
    try {
      const chatRoomId = this.getSharedChatRoomId() as string
      if (!chatRoomId) {
        await this.addChatRoom()
        this.chatService.chatRoom$.subscribe(value => {
          this.chatRoom = value
        })
        this.updateUsersIdsRooms()
        if (this.chatRoom._id) this.router.navigateByUrl(`contact/?contact=${this.contact._id}&chatRoom=${this.chatRoom._id}`)
      } else {
        this.chatService.getById(chatRoomId)
        this.chatService.chatRoom$.subscribe(value => {
          this.chatRoom = value
        })
        this.router.navigateByUrl(`contact/?contact=${this.contact._id}&chatRoom=${chatRoomId}`)
      }
    }
    catch (error) {
      console.error('can not enter chatRoom', error);
    }


  }

  getSharedChatRoomId() {
    const loggedUser = this.contactService.getLoggedinUser()
    if (!this.contact.chatRoomsIds || !this.loggedUser.chatRoomsIds) return null
    const filteredArray = this.contact.chatRoomsIds.filter(value => loggedUser.chatRoomsIds.includes(value))
    return filteredArray[0]
  }

  async addChatRoom() {
    try {
      const chatRoomToSave = this.chatService.getEmptyChatRoom() as ChatRoom
      chatRoomToSave.usersIds = [this.loggedUser._id as string, this.contact._id as string]
      await this.chatService.save(chatRoomToSave)
    } catch (error) {
      console.error('can not add chat room', error);
    }
  }

  updateUsersIdsRooms() {
    this.chatRoomId = this.chatRoom._id as string
    if (this.contact.chatRoomsIds) this.contact.chatRoomsIds.push(this.chatRoomId)
    else this.contact.chatRoomsIds = [this.chatRoomId]

    if (this.loggedUser.chatRoomsIds) this.loggedUser.chatRoomsIds.push(this.chatRoomId)
    else this.loggedUser.chatRoomsIds = [this.chatRoomId]
    this.contactService.saveLocalUser(this.loggedUser)
    this.contactService.updateUser(this.contact)
    this.contactService.updateUser(this.loggedUser)
  }

  ngOnDestroy() {
    console.log("destroying child...")
  }
}


