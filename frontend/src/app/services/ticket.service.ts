import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private apiUrl = 'http://localhost:8080/api/tickets';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(ticket: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ticket);
  }

  updateStatus(ticketId: number, status: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${ticketId}/status`, { status });
  }

  getComments(ticketId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${ticketId}/comments`);
  }

  addComment(ticketId: number, comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${ticketId}/comments`, comment);
  }
}
