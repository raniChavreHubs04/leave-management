import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

private apiUrl = 'https://leave-backend-bp79.onrender.com/api/leaves';

  constructor(private http: HttpClient) {}

  applyLeave(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getLeaves(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateStatus(id: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { status });
  }
}
