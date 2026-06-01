import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ItineraryService {
  private api = environment.apiUrl + '/itineraries';

  constructor(private http: HttpClient) {}

  getByRequestId(requestId: number) {
    return this.http.get<any>(`${this.api}/request/${requestId}`);
  }

  getById(id: number) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  create(data: any) {
    return this.http.post<any>(`${this.api}`, data);
  }

  update(id: number, data: any) {
    return this.http.put<any>(`${this.api}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
