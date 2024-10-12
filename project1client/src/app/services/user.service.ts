import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.backendUrl;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<any[]> {  // Không sử dụng model
    return this.httpClient.get<any[]>(`${this.apiUrl}/User`, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)  // Xử lý lỗi
      );
  }
  postUser(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/User`, data, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)  // Xử lý lỗi
      );
  }

  getUserById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/User/${id}`, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)  // Xử lý lỗi
      );
  }
  putUser(id: string, data: any): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/User/${id}`, data, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)  // Xử lý lỗi
      );
  }

  errorHandler(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Lỗi phía client
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Lỗi phía server
      errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // Ghi log lỗi (hoặc bạn có thể gửi lỗi tới server để theo dõi)

    console.error(errorMessage);

    // Trả về Observable lỗi
    return throwError(() => new Error(errorMessage));
  }
}
