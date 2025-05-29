import { Component } from '@angular/core';

@Component({
  selector: 'app-student',
  standalone: true,
  template: `<h1>Bienvenue étudiant</h1>`,
  styles: [`
    h1 {
      text-align: center;
      margin-top: 50px;
      color: #4caf50;
    }
  `]
})
export class StudentComponent {}
