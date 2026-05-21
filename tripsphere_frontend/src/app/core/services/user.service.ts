import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = environment.apiUrl + '/users';
  
  constructor(private http: HttpClient) {
    console.log(this.api);
  }
  
  getUsers(page: number, size: number) {
      return this.http.get<any>(`${this.api}/getusers?page=${page}&size=${size}`);
  }
  create(data: any)               { 
    return this.http.post(`${this.api}/add-user`, data);  
  }
  update(id: number, data: any)   { 
    return this.http.put(`${this.api}/update-user/${id}`, data); 
  }
  delete(id: number)              { 
    return this.http.delete(`${this.api}/delete/${id}`); 
  }
  getManagersByDepartment(department: string) {
    return this.http.get<any[]>(
    `${this.api}/managers/${department}`
  );
}
}
