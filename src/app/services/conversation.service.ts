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

  // Get a conversation between two users
  getConversationBetweenUsers(userId1: string, userId2: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId1}/${userId2}`);
  }

  // Create a new conversation by sending receiverId (backend uses logged-in user from token)
  createConversation(receiverId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${receiverId}`, {});
  }

  // Add a message to a conversation between two users
  addMessage(userId1: string, userId2: string, messageData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId1}/${userId2}/message`, messageData);
  }

  // Additional methods (e.g., getConversations) can remain as before
  getConversations(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
