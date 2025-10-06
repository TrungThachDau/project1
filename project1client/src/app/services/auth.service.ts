import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  EmailAuthProvider
} from "@angular/fire/auth";
import {catchError, Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {EmailValidator} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.backendUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private auth: Auth = inject(Auth), private http: HttpClient = inject(HttpClient)) { }

  async signIn(email: string, password: string)  {
    if (!email || !password) {
      return Promise.reject('Email and password must not be null');
    }
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async signUp(email: string, password: string): Promise<any> {
    try {

      return await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async signOut() {
    try {
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('uid');
      sessionStorage.removeItem('permissions');
      await signOut(this.auth);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  updateLastLogin(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/Auth/update-last-login/${id}`, {}, this.httpOptions)
  }
  verifyToken(idToken: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/Auth/verify-token`, { IdToken: idToken }, this.httpOptions)
  }
  getPermission(uid:string): Observable<any>{
    try{
      return this.http.get(`${this.apiUrl}/Auth/get-permission/${uid}`, this.httpOptions)
    } catch (error) {
      console.error(error);
      throw error;
    }

  }

  async resetPassword(email: string): Promise<void> {
    try {
      // await sendPasswordResetEmail trả về một Promise
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      // Ghi lỗi ra console
      console.error('Error resetting password:', error);
      // Ném lỗi để các phần khác xử lý
      throw error;
    }
  }


  async changePassword(oldPassword:string,newPassword: string): Promise<void> {
    try {
      const user = await this.auth.currentUser;
      const email = user?.email as string;
      if (user) {
        const credential = EmailAuthProvider.credential(email, oldPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
