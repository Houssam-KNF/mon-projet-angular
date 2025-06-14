import { Component } from '@angular/core';
import { Router } from '@angular/router'; // <-- IMPORT MANQUANT AJOUTÉ
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import {AnimatedBackgroundComponent} from './components/animated-background/animated-background.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, AnimatedBackgroundComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
      this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
    }
  }
}
