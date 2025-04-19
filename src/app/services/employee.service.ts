import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/employees';
  constructor(private http: HttpClient) {}
  getAll(): Observable<any[]> { return this.http.get<any[]>(this.apiUrl); }
  getById(id: number): Observable<any> { return this.http.get<any>(`${this.apiUrl}/${id}`); }
  create(emp: any): Observable<any> { return this.http.post<any>(this.apiUrl, emp); }
  update(id: number, emp: any): Observable<any> { return this.http.put<any>(`${this.apiUrl}/${id}`, emp); }
  delete(id: number): Observable<any> { return this.http.delete<any>(`${this.apiUrl}/${id}`); }
}