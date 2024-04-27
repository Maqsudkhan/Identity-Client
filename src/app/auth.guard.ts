import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
var userRouter = false;
var adminRouter = true;
var tokenKey = 'token';


export const loginGuard: CanActivateFn = (route, state) => {
  console.log('route keldi');
  console.log(route);

  console.log('state keldi');
  console.log(state);

  return true;
};

export const registerGuard: CanActivateFn = (route, state) => {
  return true;
};

export const usersGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)

  

 if(localStorage.getItem(tokenKey) != null) {
  const tokenDecoded: any = jwtDecode(localStorage.getItem(tokenKey)!)

  // console.log('users dan kelyabdi');
  // console.log(tokenDecoded.role);
  const data = tokenDecoded.role;
  // console.log(tokenDecoded);

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if(element == 'Admin') {
      console.log('usersga navigate');
      router.navigate(['/login'])
      return true
    } else if(element == 'Student') {
      console.log('student profilega navigate');
      router.navigate(['/student-profile'])
      return true
    }
  }
 }
  
  console.log('navigate boldi');
  router.navigate(['/login'])
  return false;
};

export const studentProfileGuard: CanActivateFn = (route, state) => {
  return false;
};

export const logoutGuard: CanActivateFn = (route, state) => {
  return false;
};

