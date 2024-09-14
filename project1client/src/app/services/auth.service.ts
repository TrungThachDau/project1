import { inject, Injectable } from '@angular/core';
import {Auth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, validatePassword} from "@angular/fire/auth";
import {catchError, Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7278/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  auth: Auth = inject(Auth);
  http: HttpClient = inject(HttpClient);

  constructor() { }

  async signIn(email: string, password: string) {
    if (!email || !password) {
      return Promise.reject('Email and password must not be null');
    }

    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async signOut() {
    try {
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('uid');
      await signOut(this.auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  verifyToken(idToken: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/Auth/verify-token`, { IdToken: idToken }, this.httpOptions)
  }
  getPermission(uid:string): Observable<any>{
    return this.http.get(`${this.apiUrl}/Auth/get-permission/${uid}`, this.httpOptions)
  }
  async resetPassword(email:string){
    try{
      return await sendPasswordResetEmail(this.auth, email);
    } catch (error){
      console.error(error);
    }
  }
}
