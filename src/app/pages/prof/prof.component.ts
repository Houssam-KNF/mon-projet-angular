import { Component } from '@angular/core';

@Component({
  selector: 'app-prof',
  standalone: true,
  template: `<h1>Espace Professeur</h1>`,
  styles: [`
    h1 {
      text-align: center;
      margin-top: 50px;
      color: #5d6d9e;
    }
  `]
})
export class ProfComponent {}
