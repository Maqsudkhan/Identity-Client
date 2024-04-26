import { CanActivateFn } from '@angular/router';
var userRouter = false;
var adminRouter = true;

export const loginGuard: CanActivateFn = (route, state) => {
  return true;
};

export const registerGuard: CanActivateFn = (route, state) => {
  return true;
};

export const usersGuard: CanActivateFn = (route, state) => {
  return false;
};

export const studentProfileGuard: CanActivateFn = (route, state) => {
  return false;
};

export const logoutGuard: CanActivateFn = (route, state) => {
  return false;
};

