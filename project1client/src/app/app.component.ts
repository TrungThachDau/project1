import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {SpinnerService} from "./services/spinner.service";
@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MatButtonModule, MatDividerModule, MatIconModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'project1client';
  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    // Hiện spinner khi trình duyệt đang tải trang
    window.onbeforeunload = () => {
      this.spinnerService.show('Đang tải...');
    };

    // Tắt spinner khi trang đã tải xong
    window.onload = () => {
      this.spinnerService.hide();
    };
  }

}
