import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-professeur-add',
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormField,
    MatDialogTitle,
    MatDialogContent,
    MatLabel,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSelect,
    MatInput,
    MatOption,
    MatIcon,
    MatDialogActions,
    MatButton,
    MatHint,
    MatDialogClose,
    NgIf
  ],templateUrl: './professeur-add.component.html',
  styleUrls: ['./professeur-add.component.css']
})
export class ProfesseurAddComponent implements OnInit {
  profForm!: FormGroup;
  generatedUsername: string = '';
  generatedPassword: string = '';
  matieres = [
    'Mathématiques',
    'Physique-Chimie',
    'Français',
    'Histoire-Géographie',
    'SVT'
  ];
  imagePreview: string = 'assets/default-avatar.png';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProfesseurAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.profForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(50)]],
      prenom: ['', [Validators.required, Validators.maxLength(50)]],
      dateNaissance: ['', Validators.required],
      CIN: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{8}$/)]],
      dateDebutContrat: ['', Validators.required],
      dateFinContrat: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^\+212[5-7]\d{8}$/)]],
      matiere: ['', Validators.required],
      experience: [0, [Validators.min(0)]],
      image: [''],
      RIB: ['', [
        Validators.required,
        Validators.pattern(/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/)
      ]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.generateCredentials();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.match(/image\/(jpeg|png|gif|bmp)/)) {
        alert('Seules les images (JPEG, PNG, GIF, BMP) sont autorisées');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.imagePreview = reader.result;
          this.profForm.patchValue({ image: reader.result });
        }
      };
      reader.onerror = (error) => {
        console.error('Erreur de lecture du fichier:', error);
        this.imagePreview = 'assets/default-avatar.png';
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.generateCredentials();
  }

  initForm(): void {
    this.profForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      CIN: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{8}$/)]],
      matiere: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required]
    });
  }

  generateCredentials(): void {
    const nom = this.profForm.get('nom')?.value || '';
    const prenom = this.profForm.get('prenom')?.value || '';
    this.generatedUsername = `${prenom.charAt(0)}${nom}`.toLowerCase();

    const cin = this.profForm.get('CIN')?.value || '';
    const birthDate = this.profForm.get('dateNaissance')?.value;
    const birthYear = birthDate ? new Date(birthDate).getFullYear().toString().slice(-2) : '';
    this.generatedPassword = `${cin}${birthYear}`;
  }

  onSubmit(): void {
    if (this.profForm.valid) {
      const newProfesseur = {
        ...this.profForm.value,
        id: Date.now(),
        username: this.generatedUsername,
        password: this.generatedPassword,
        disponibilite: [],
      };
      this.dialogRef.close(newProfesseur);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }


}
