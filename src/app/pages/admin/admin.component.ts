import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import {MatIconButton} from '@angular/material/button'; // Ajouter Router

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    MatIconButton,
  ]
})
export class AdminComponent {
  // Ajouter l'injection du Router
  constructor(private router: Router) {}

  user = {
    avatar: 'images/avatar-admin.png',
    firstName: 'Jean',
    lastName: 'Dupont'
  };

  notificationsCount = 3;
  messagesCount = 1;

  menuItems = [
    { path: '/admin/dashboard', icon: 'dashboard', label: 'Tableau de bord' },
    { path: '/admin/professeurs', icon: 'groups', label: 'Professeurs' },
    { path: '/admin/etudiants', icon: 'school', label: 'Étudiants' },
    { path: '/admin/ecole', icon: 'apartment', label: 'École' },
    { path: '/admin/annonces', icon: 'campaign', label: 'Annonces' },
    { path: '/admin/parametres', icon: 'settings', label: 'Paramètres' }
  ];

  // Corriger la signature de la méthode
  checkActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
