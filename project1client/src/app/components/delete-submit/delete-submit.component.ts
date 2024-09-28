import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {
  DialogAddUserSuccessfulComponent
} from "../management/user/add-user/dialog-add-user-successful/dialog-add-user-successful.component";

@Component({
  selector: 'app-delete-submit',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogTitle
  ],
  templateUrl: './delete-submit.component.html',
  styleUrl: './delete-submit.component.scss'
})
export class DeleteSubmitComponent {
  constructor(public dialogRef: MatDialogRef<DeleteSubmitComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { name:string}
  ) {
  }
}
