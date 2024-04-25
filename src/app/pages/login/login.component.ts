import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  hide = true;
  form!: FormGroup;
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  
  login() {
    this.authService.login(this.form.value).subscribe({
      next: (response) =>{
        console.log(response);
      },
      error: (err) => {
        // this,localStorage
        console.log(err);
      
      }
    }
  )
  }
  
}
