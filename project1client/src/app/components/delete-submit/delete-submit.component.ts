import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'app-delete-submit',
    imports: [
        MatDialogModule,
        MatButtonModule,
    ],
    templateUrl: './delete-submit.component.html',
    styleUrl: './delete-submit.component.scss'
})
export class DeleteSubmitComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { name:string}
  ) {
  }
}
