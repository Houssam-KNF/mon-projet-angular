import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const role = this.authService.login(this.username, this.password);

    if (role === 'admin') {
      this.router.navigate(['/admin']);
    } else if (role === 'prof') {
      this.router.navigate(['/prof']);
    } else if (role === 'student') {
      this.router.navigate(['/student']);
    } else {
      this.errorMessage = "Nom d'utilisateur ou mot de passe incorrect.";
    }
  }
}
