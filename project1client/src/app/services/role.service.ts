import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = environment.backendUrl;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<any[]> {  // Không sử dụng model
    return this.httpClient.get<any[]>(`${this.apiUrl}/Role`, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  postRole(role: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/Role`, JSON.stringify(role), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  getRoleById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/Role/${id}`, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  putRole(id: string, data: any): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/Role/${id}`, data, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)  // Xử lý lỗi
      );
  }
  deleteRole(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/Role/${id}`, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;

    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}
