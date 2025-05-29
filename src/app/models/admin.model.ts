import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {NgModule} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {ProfesseurDetailComponent} from '../pages/admin/professeurs/professeur-detail/professeur-detail.component';
import { ProfesseurAddComponent } from '../pages/admin/professeurs/professeur-add/professeur-add.component';


@NgModule({
  imports: [
    ProfesseurAddComponent,
    ProfesseurDetailComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class AdminModule {}
