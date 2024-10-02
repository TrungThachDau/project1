import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private apiUrl = environment.backendUrl;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

  }

  constructor(private httpClient: HttpClient) { }

  getPermissionByRole(roleId: number) {
    return this.httpClient.get<any[]>(`${this.apiUrl}/Authorization/get-permission/${roleId}`, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  getAllPermission(){
    return this.httpClient.get<any[]>(`${this.apiUrl}/Permission`, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  putRolePermission(roleId: number, permissionIds: any[], idToken:string) {
    return this.httpClient.put(`${this.apiUrl}/Authorization/update-role-permission/${roleId}?idToken=${idToken}`, permissionIds, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          throw new Error(error.message || 'Unknown error');
          // Quan trọng để truyền lỗi về subscriber
        })
      );
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
