import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProfComponent } from './pages/prof/prof.component';
import { StudentComponent } from './pages/student/student.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import {ProfesseursComponent} from './pages/admin/professeurs/professeurs.component';
import {EtudiantsComponent} from './pages/admin/etudiants/etudiants.component';
import {EcoleComponent} from './pages/admin/ecole/ecole.component';
import {AnnoncesComponent} from './pages/admin/annonces/annonces.component';
import {ParametresComponent} from './pages/admin/parametres/parametres.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'prof', component: ProfComponent },
  { path: 'student', component: StudentComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'professeurs', component: ProfesseursComponent },
      { path: 'etudiants', component: EtudiantsComponent },
      { path: 'ecole', component: EcoleComponent },
      { path: 'annonces', component: AnnoncesComponent },
      { path: 'parametres', component: ParametresComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
