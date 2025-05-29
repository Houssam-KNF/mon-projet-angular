import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatList, MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { animate, style, transition, trigger } from '@angular/animations';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-note-dialog',
  template: `
    <div class="dialog-container" [@fadeInOut]>
      <h2 mat-dialog-title class="dialog-title">
        <mat-icon>notes</mat-icon>
        Notes du {{ data.date | date:'dd/MM/yyyy' }}
      </h2>

      <div mat-dialog-content class="content">
        <mat-list class="notes-list">
          <mat-list-item *ngFor="let note of data.notes; index as i"
                         [@slideInOut]
                         class="note-item">
            <div class="note-content">
              <span>{{ note }}</span>
              <button mat-icon-button
                      (click)="deleteNote(i)"
                      class="delete-btn">
                <mat-icon>delete_outline</mat-icon>
              </button>
            </div>
          </mat-list-item>

          <div *ngIf="data.notes.length === 0" class="empty-state">
            <mat-icon>info</mat-icon>
            Aucune note pour cette date
          </div>
        </mat-list>

        <div class="new-note">
          <mat-form-field appearance="outline" floatLabel="always">
            <mat-label>Nouvelle note</mat-label>
            <textarea matInput
                      [(ngModel)]="newNote"
                      cdkTextareaAutosize
                      #autosize="cdkTextareaAutosize"
                      cdkAutosizeMinRows="1"
                      cdkAutosizeMaxRows="3"
                      placeholder="Saisissez votre note...">
            </textarea>
          </mat-form-field>
          <button mat-raised-button
                  color="primary"
                  (click)="addNote()"
                  class="add-btn"
                  [disabled]="!newNote.trim()">
            <mat-icon>add_circle</mat-icon>
            Ajouter
          </button>
        </div>
      </div>

      <div mat-dialog-actions class="actions">
        <button mat-stroked-button
                color="primary"
                (click)="onCancel()">
          Fermer
        </button>
      </div>
    </div>
  `,
  imports: [
    MatList,
    MatListItem,
    MatIcon,
    MatFormField,
    FormsModule,
    DatePipe,
    MatInput,
    MatIconButton,
    MatDialogActions,
    MatButton,
    MatDialogTitle,
    MatDialogContent,
    MatLabel,
    NgForOf,
    NgIf,
    CdkTextareaAutosize,
  ],
  styles: [`
    .dialog-container {
      padding: 24px;
      min-width: 400px;
      background: #ffffff;
      border-radius: 12px;
    }

    .dialog-title {
      display: flex;
      align-items: center;
      gap: 12px;
      color: #2c3e50;
      font-weight: 600;
      padding-bottom: 16px;
      border-bottom: 1px solid #eeeeee;
      margin-bottom: 20px;
    }

    .notes-list {
      max-height: 400px;
      padding: 0;
      margin: 0 0 20px 0;
      overflow: hidden;
    }

    .note-item {
      transition: all 0.2s ease;
      padding: 12px 16px;
      margin: 8px 0;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e9ecef;
      transform: translateX(-4px);

      &:hover {
        transform: translateX(4px);
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
    }

    .note-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .delete-btn {
      color: #ff4444;
      opacity: 0.7;
      transition: opacity 0.2s ease;

      &:hover {
        background: rgba(255, 68, 68, 0.1);
      }
    }

    .new-note {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }

    mat-form-field {
      flex-grow: 1;

      textarea {
        min-height: 40px;
      }
    }

    .add-btn {
      margin-top: 4px;
      padding: 8px 16px;
      border-radius: 8px;
    }

    .empty-state {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
      padding: 20px;
      justify-content: center;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      padding-top: 20px;
      border-top: 1px solid #eeeeee;
      margin-top: 20px;
    }

    @media (max-width: 600px) {
      .dialog-container {
        min-width: unset;
        width: 90vw;
      }

      .new-note {
        flex-direction: column;
      }
    }
  `],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class NoteDialogComponent {
  newNote = '';

  constructor(
    public dialogRef: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { notes: string[], date: Date }
  ) {}

  addNote(): void {
    if(this.newNote.trim()) {
      this.data.notes.push(this.newNote);
      this.newNote = '';
    }
  }

  deleteNote(index: number): void {
    this.data.notes.splice(index, 1);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
