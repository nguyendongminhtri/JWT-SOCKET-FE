import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ChatMessage} from '../model/ChatMessage';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
//API LOCAL
  private API_CHAT = 'http://localhost:8080/api/auth/chat'
  constructor(private http: HttpClient) { }
  chatMessage(chatMessage: ChatMessage): Observable<any>{
    console.log('chatMessage tren SV', chatMessage)
    return this.http.post<any>(this.API_CHAT, chatMessage);
  }
}
