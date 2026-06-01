import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PolicyService {
  private api = environment.apiUrl + '/policies';
  
  constructor(private http: HttpClient) {}

  getActivePolicy() { 
    return this.http.get<any>(`${this.api}/active`); 
  }

  getAllPolicies() { 
    return this.http.get<any[]>(`${this.api}/all`); 
  }

  getPolicyById(id: number) { 
    return this.http.get<any>(`${this.api}/${id}`); 
  }

  createPolicy(data: any) { 
    return this.http.post(`${this.api}`, data); 
  }

  updatePolicy(id: number, data: any) { 
    return this.http.put(`${this.api}/${id}`, data); 
  }

  deletePolicy(id: number) { 
    return this.http.delete(`${this.api}/${id}`); 
  }
}
