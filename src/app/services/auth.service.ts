import { Injectable, inject } from '@angular/core';
import { LoginRequest } from '../interfaces/login-request';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { LoginResponse } from '../interfaces/login-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;

  // http1 = inject(HttpClient)

  constructor(private http: HttpClient) { }
  apiUrl = environment.apiUrl;
  tokenKey: string = 'token';
  router = inject(Router)

  login(data:LoginRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}Users/Login`, data).pipe(
      map((response)=>{
        if(response.isSuccess){
          localStorage.setItem(this.tokenKey, response.token)
        }
        this.router.navigate(['/register'])
        return response;
      })
    );
  }


  register(data:RegisterRequest): Observable<string>{
    return this.http.post<string>(`${this.apiUrl}Users/Register`,data).pipe(
      map((response)=>{
        if(response == "nimadr"){
          this.router.navigate(['/login'])
        }
        this.router.navigate(['/register'])
        return response
      })
    );

}

logout()
{
  localStorage.setItem(this.tokenKey,'');
}
}





