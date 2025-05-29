import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { Professeur } from '../../../../models/professeur.model';
import {DatePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-professeur-detail',
  templateUrl: './professeur-detail.component.html',
  imports: [
    MatIcon,
    DatePipe,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  styleUrls: ['./professeur-detail.component.css']
})
export class ProfesseurDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Professeur) {}

  editProfesseur(): void {
    // Logique de modification
  }
}
