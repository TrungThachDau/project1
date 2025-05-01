import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private isLoading = new BehaviorSubject<boolean>(false);
  private loadingMessage = new BehaviorSubject<string>('Đang xử lý...');
  isLoading$ = this.isLoading.asObservable();
  loadingMessage$ = this.loadingMessage.asObservable();

  // Hàm show nhận thông báo tuỳ chỉnh
  show(message: string = 'Đang xử lý...') {
    this.loadingMessage.next(message);  // Phát ra thông báo tuỳ chỉnh
    this.isLoading.next(true);          // Bật trạng thái loading
  }

  hide() {
    this.isLoading.next(false);
  }
}
