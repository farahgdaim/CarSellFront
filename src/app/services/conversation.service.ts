import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ConversationService {
  
  private apiUrl = environment.apiUrl + '/utilisateur/conversations';

  constructor(private http: HttpClient) { }

  // Get all conversations
  getConversations(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Get a conversation between two users
  getConversationBetweenUsers(userId1: string, userId2: string): Observable<any> {
    console.log("userId1: ", userId1, "userId2: ", userId2);
    console.log(String(this.http.get(`${this.apiUrl}/${userId1}/${userId2}`)));
    console.log(this.apiUrl, userId1, userId2);
    return this.http.get(`${this.apiUrl}/${userId1}/${userId2}`);
  }
  //http://localhost:8000/api/utilisateur/conversations/67dbed15d54ac5e9de025bb2/67dbed6dd54ac5e9de025bb4

  // Create or fetch a conversation between the logged-in user and another user
  createConversation(receiverId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${receiverId}`, {});
  }

  // Delete a conversation between two users
  deleteConversation(userId1: string, userId2: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId1}/${userId2}`);
  }

  // Add a new message to a conversation between two users
  addMessage(userId1: string, userId2: string, messageData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId1}/${userId2}/message`, messageData);
  }
}
