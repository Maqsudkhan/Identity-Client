import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

  authService = inject(AuthService);

  logut(){
    this.authService.logout();
    console.log("Log out bo'ldi");
    
  }
}
