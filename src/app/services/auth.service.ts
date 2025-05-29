import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'prof1', password: 'prof123', role: 'prof' },
    { username: 'student1', password: 'student123', role: 'student' }
  ];

  login(username: string, password: string): string | null {
    const user = this.users.find(
      u => u.username === username && u.password === password
    );
    return user ? user.role : null;
  }
}
