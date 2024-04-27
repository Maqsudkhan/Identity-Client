import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor() {
    this.iterator +=1;
    console.log('console dan kegan');
    console.log(this.iterator);
  }
  
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  hide = true;
  form!: FormGroup;
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  decodedToken: any | null;
  tokenKey = 'token' 
  roles: string[] = [];
  iterator = 0;

  tokenDecoded : any;

  login(){
    this.authService.login(this.form.value).subscribe(
      {
        next: (response) => {
          console.log(response);

          this.decodedToken = jwtDecode(localStorage.getItem(this.tokenKey)!)
          console.log('rollar kelishi kere');
          for (let index = 0; index < this.decodedToken.role.length; index++) {
            console.log(this.decodedToken.role[index]);
            if(this.decodedToken.role[index] == 'Admin'){
              console.log('admin-test');
              console.log(this.decodedToken.role[index]);
              this.router.navigate(['/users'])
            }
            else if(this.decodedToken.role[index] == 'Student'){
              console.log('student-test');
              console.log(this.decodedToken.role[index]);
              this.router.navigate(['/student-profile'])
            }
            
          }
          

          this.matSnackBar.open(response.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center'

          })

        },
        error: (err) => {
          
          console.log(err);

          this.matSnackBar.open(err.error.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center'
          })
        }
        
      }
    )
  }
  
    ngOnInit(): void {
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });

      
      this.tokenDecoded = jwtDecode(localStorage.getItem(this.tokenKey)!)
      console.log('decoded token');
      console.log(this.tokenDecoded);
      console.log('data kelyabdi');
        console.log(Date.now());

      if(this.tokenDecoded.exp * 1000 < Date.now()){
        this.router.navigate(['/register'])
      }
    
    }
}