import { Component} from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [NavbarComponent,MatFormField,MatInput,MatLabel],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent {
}
