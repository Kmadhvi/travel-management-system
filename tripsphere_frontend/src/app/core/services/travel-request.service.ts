import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TravelRequestService {
  private api = environment.apiUrl + '/travel-requests';
  constructor(private http: HttpClient) {}

  getAll()                    { return this.http.get<any[]>(`${this.api}/all-requests`); }
  getByEmployee(id: number)   { return this.http.get<any[]>(`${this.api}/employee/${id}`); }
  getById(id: number)         { return this.http.get<any>(`${this.api}/${id}`); }
  create(data: any)           { return this.http.post(`${this.api}/add-travel-request`, data); }
  submit(id: number)          { return this.http.put(`${this.api}/${id}/submit`, {}); }
  getByStatus(status: string) { return this.http.get<any[]>(`${this.api}/status/${status}`); }
  
  approveByManager(id: number, managerId: number, comment: string) {
    return this.http.put(
      `${this.api}/${id}/approve-manager?managerId=${managerId}&comment=${encodeURIComponent(comment)}`, {}
    );
  }
  
  approveByFinance(id: number, comment: string) {
    return this.http.put(
      `${this.api}/${id}/approve-finance?comment=${encodeURIComponent(comment)}`, {}
    );
  }
  
  reject(id: number, comment: string) {
    return this.http.put(
      `${this.api}/${id}/reject?comment=${encodeURIComponent(comment)}`, {}
    );
  }


}