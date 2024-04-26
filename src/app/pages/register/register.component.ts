import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  hide = true;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: ['',Validators.required] // Initialize roles as an empty array
    });
  }

  register() {
    if (this.form.invalid) {
      return;
    }
    const roleString : string = this.form.value.roles;
    const roles : string[] = roleString.split(' ').map((role: string)=>role.trim());
    this.form.value.roles = roles;
    
    this.authService['register'](this.form.value).subscribe({
      next: (response: any) => {
        console.log(response);
        // Redirect or show success message
      },
      error: (err: any) => {
        console.log(err);
        this.matSnackBar.open(err.error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center'
        });
      }
    });
  }
}