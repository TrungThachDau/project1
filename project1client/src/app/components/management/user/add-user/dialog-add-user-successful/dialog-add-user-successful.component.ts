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

@Component({
    selector: 'app-dialog-add-user-successful',
    imports: [
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        MatDialogTitle
    ],
    templateUrl: './dialog-add-user-successful.component.html',
    styleUrl: './dialog-add-user-successful.component.scss'
})
export class DialogAddUserSuccessfulComponent {
  constructor(public dialogRef: MatDialogRef<DialogAddUserSuccessfulComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { username:string,password: string }
              ) {
  }

}
