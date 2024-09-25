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
    return throwError(errorMessage);
  }
}
