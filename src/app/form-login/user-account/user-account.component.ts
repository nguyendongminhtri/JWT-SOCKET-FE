import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../auth/token.service';
import {ChatService} from '../../service/chat.service';
import {ChatMessage} from '../../model/ChatMessage';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
form: any = {};
chatForm: ChatMessage;
  constructor(private tokenService: TokenService,
              private chatService: ChatService) {
  }

  ngOnInit(): void {

  }
  chatSubMit(){
    this.chatForm = new ChatMessage(
      this.form.content
    )
    console.log('chatForm', this.chatForm)
    this.chatService.chatMessage(this.chatForm).subscribe(data =>{
      console.log('data = ', data)
    })


  }}
