import { Professeur } from '../../../models/professeur.model';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {DatePipe, NgForOf} from '@angular/common';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {MatDialog} from '@angular/material/dialog';
import {ProfesseurDetailComponent} from './professeur-detail/professeur-detail.component';
import {ProfesseurAddComponent} from './professeur-add/professeur-add.component';

@Component({
  selector: 'app-professeurs',
  templateUrl: './professeurs.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    DatePipe,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    FormsModule,
    MatIcon,
    MatInput,
    MatButton,
    NgForOf,
  ],
  styleUrls: ['./professeurs.component.css'],
})
export class ProfesseursComponent implements OnInit{

  constructor(public dialog: MatDialog) {}

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ProfesseurAddComponent, {
      data: {matieres: this.matieres} // Transmettre des données si nécessaire
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        // Logique d'ajout ici
        console.log('Nouveau professeur:', result);
      }
    });
  }

  selectProfesseur(prof: Professeur): void {
    this.dialog.open(ProfesseurDetailComponent, {
      width: '600px',
      data: prof,
      panelClass: 'detail-dialog'
    });
  }

  ngOnInit() {
    this.applyFilters(); // Appliquer les filtres au chargement
  }

  selectedMatiere: string[] = [];
  selectedStatut: string = 'tous';
  searchQuery: string = '';
  matieres = ['Mathématiques', 'Physique-Chimie', 'Français', 'Histoire-Géographie', 'SVT'];
  stats: any = {
    total: 0,
    encours: 0,
    expires: 0
  };

  displayedColumns: string[] = [
    'photo',
    'nom',
    'email',
    'telephone',
    'finContrat'
  ];

  generateProfesseursTest(): Professeur[] {
    const professeurs: Professeur[] = [];
    const firstNames = ['Jean', 'Marie', 'Pierre', 'Sophie', 'Luc', 'Émilie', 'Antoine', 'Camille', 'Nicolas', 'Isabelle'];
    const lastNames = ['Dupont', 'Martin', 'Leroy', 'Moreau', 'Simon', 'Laurent', 'Lefèvre', 'Michel', 'Garcia', 'Roux'];
    this.matieres = [
      'Mathématiques',
      'Physique-Chimie',
      'Français',
      'Histoire-Géographie',
      'SVT',
      'Anglais', // Ajouter les matières manquantes
      'Philosophie',
      'Économie',
      'Informatique',
      'Arts Plastiques'
    ];

    for (let i = 1; i <= 20; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const matiere = (this.matieres)[Math.floor(Math.random() * this.matieres.length)];

      professeurs.push(new Professeur(
        i,
        lastName,
        firstName,
        this.randomDate(new Date(1950, 0, 1), new Date(2000, 0, 1)), // Date naissance
        this.generateCIN(),
        this.generateRIB(),
        this.randomDate(new Date(2018, 0, 1), new Date(2023, 0, 1)), // Début contrat
        this.randomDate(new Date(2024, 0, 1), new Date(2026, 0, 1)), // Fin contrat
        `${firstName.toLowerCase()}.${lastName.toLowerCase()}@neocampus.fr`,
        this.generatePhoneNumber(),
        this.generateAddress(),
        matiere,
        Math.floor(Math.random() * 20) + 1, // Expérience entre 1 et 20 ans
        `${firstName.charAt(0)}${lastName.toLowerCase()}`, // username
        'password123', // Mot de passe temporaire
        this.generateDisponibilite(),
        `https://picsum.photos/100/100?random=${i}` // Image aléatoire
      ));
    }
    return professeurs;
  }

// Fonctions utilitaires
  private randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  private generateCIN(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters.charAt(Math.floor(Math.random() * letters.length)) +
      Math.floor(100000 + Math.random() * 900000);
  }

  private generateRIB(): string {
    return 'FR76' +
      Math.floor(1000 + Math.random() * 9000) + // Code banque
      Math.floor(10000 + Math.random() * 90000) + // Code guichet
      Math.floor(10000000000 + Math.random() * 90000000000) + // Numéro de compte
      '89'; // Clé RIB
  }

  private generatePhoneNumber(): string {
    return '+33' +
      (6 + Math.floor(Math.random() * 4)) + // 6,7,8,9
      Math.floor(10 + Math.random() * 90) + // Deux chiffres
      Math.floor(10 + Math.random() * 90) +
      Math.floor(10 + Math.random() * 90) +
      Math.floor(10 + Math.random() * 90);
  }

  private generateAddress(): string {
    const streets = ['Rue de la République', 'Avenue des Champs-Élysées', 'Rue du Commerce',
      'Boulevard Saint-Germain', 'Avenue Victor Hugo'];
    return `${Math.floor(1 + Math.random() * 200)} ${streets[Math.floor(Math.random() * streets.length)]},
          ${75000 + Math.floor(Math.random() * 20)}`;
  }

  private generateDisponibilite(): string[] {
    const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
    const creneaux = [];
    for (let j = 0; j < 2; j++) { // 2 créneaux par professeur
      const jour = jours[Math.floor(Math.random() * jours.length)];
      const heure = `${8 + Math.floor(Math.random() * 6)}h-${14 + Math.floor(Math.random() * 6)}h`;
      creneaux.push(`${jour} ${heure}`);
    }
    return creneaux;
  }

// Initialisation dans le composant
  professeurs: Professeur[] = this.generateProfesseursTest();

  filteredProfesseurs: Professeur[] = [];


  @ViewChild('combinedChart') combinedChartRef: any;
  combinedChart: any;

  ngAfterViewInit() {
    this.createCombinedChart();
  }

  createCombinedChart() {
    Chart.register(...registerables);

    const subjects = this.matieres;
    const currentData = subjects.map(subject =>
      this.professeurs.filter(p =>
        p.matiere === subject &&
        new Date(p.date_fin_contrat) > new Date()
      ).length
    );

    const expiredData = subjects.map(subject =>
      this.professeurs.filter(p =>
        p.matiere === subject &&
        new Date(p.date_fin_contrat) <= new Date()
      ).length
    );

    this.combinedChart = new Chart(this.combinedChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: subjects,
        datasets: [
          {
            label: 'Contrats en cours',
            data: currentData,
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            borderRadius: 5
          },
          {
            label: 'Contrats expirés',
            data: expiredData,
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            borderRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true,
            title: {
              display: true,
              text: 'Filières'
            }
          },
          y: {
            stacked: true,
            title: {
              display: true,
              text: 'Nombre de professeurs'
            },
            beginAtZero: true
          }
        },
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false
          },
          legend: {
            position: 'top'
          }
        }
      }
    });
  }

  updateCharts() {
    if (this.combinedChart) {
      this.combinedChart.destroy();
    }
    this.createCombinedChart();
  }


  // Applique tous les filtres
  applyFilters(): void {
    this.filteredProfesseurs = this.professeurs.filter(prof => {
      // Remplacer includes() par some() pour la comparaison
      const matchesMatiere = this.selectedMatiere.length === 0 ||
        this.selectedMatiere.some(m => m === prof.matiere);

      const matchesStatut = this.selectedStatut === 'tous' ||
        (this.selectedStatut === 'encours' &&
          new Date(prof.date_fin_contrat) > new Date()) ||
        (this.selectedStatut === 'expire' &&
          new Date(prof.date_fin_contrat) <= new Date());

      const matchesSearch = Object.values(prof).join(' ').toLowerCase()
        .includes(this.searchQuery.toLowerCase());

      return matchesMatiere && matchesStatut && matchesSearch;
    });
    this.updateStats();
  }

  private updateStats(): void {
    this.stats = {
      total: this.professeurs.length,
      encours: this.professeurs.filter(p => new Date(p.date_fin_contrat) > new Date()).length,
      expires: this.professeurs.filter(p => new Date(p.date_fin_contrat) <= new Date()).length
    };
  }
}
