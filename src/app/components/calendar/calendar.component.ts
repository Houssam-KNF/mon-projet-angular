import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import {DatePipe, NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

interface CalendarDate {
  date: Date;
  notes: string[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  imports: [
    MatIcon,
    DatePipe,
    TitleCasePipe,
    MatIconButton,
    NgForOf,
    NgIf,
  ],
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  currentMonth: Date = new Date();
  selectedDate: Date | null = null;
  hoverDate: Date | null = null;
  weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  calendar: Date[] = [];
  notes: { [key: string]: string[] } = {};

  constructor(private dialog: MatDialog) {
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.calendar = [];
    const start = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const end = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);

    // Add previous month days
    start.setDate(start.getDate() - start.getDay());

    // Generate 42 days (6 weeks)
    for(let i = 0; i < 42; i++) {
      this.calendar.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isSelected(date: Date): boolean {
    return this.selectedDate?.toDateString() === date.toDateString();
  }

  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentMonth.getMonth();
  }

  hasNotes(date: Date): boolean {
    return this.notes[this.dateKey(date)]?.length > 0;
  }

  selectDate(date: Date): void {
    this.selectedDate = date;
  }

  openNoteDialog(date: Date): void {
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      data: {
        notes: this.notes[this.dateKey(date)] || [],
        date: date
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.notes[this.dateKey(date)] = result.notes;
      }
    });
  }

  private dateKey(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  previousMonth(): void {
    this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
    this.generateCalendar();
  }
}
