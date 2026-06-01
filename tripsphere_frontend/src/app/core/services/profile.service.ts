import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private api = environment.apiUrl + '/users';
  constructor(private http: HttpClient) {}

  getMyProfile()              { return this.http.get<any>(`${this.api}/me`); }
  updateProfile(data: any)    { return this.http.put<any>(`${this.api}/me`, data); }
  changePassword(data: any)   { return this.http.put<any>(`${this.api}/me/password`, data); }
}
