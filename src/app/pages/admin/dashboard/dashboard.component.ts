import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {NgForOf} from '@angular/common';
import {CalendarComponent} from '../../../components/calendar/calendar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    MatIcon,
    NgForOf,
    CalendarComponent
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  messages = [
    {
      sender: 'Dr Émilie Dubois',
      content: 'Veuillez vérifier l\'exactitude du rapport de présence mensuel avant la date limite du 30 avril.',
      time: '09h45'
    },
    {
      sender: 'Mme Camille Leroux',
      content: 'N\'oubliez pas la formation du personnel sur les outils numériques prévue le 5 mai à 15h...',
      time: 'Hier'
    },
    {
      sender: 'M. Paul Lefèvre',
      content: 'Réunion de révision budgétaire pour l\'exercice suivant le 28 avril à 10h.',
      time: '14h30'
    },
    {
      sender: 'Officier Marc Bernard',
      content: 'Veuillez prendre connaissance des nouveaux protocoles de sécurité applicables à partir du 1er mai.',
      time: 'Hier'
    },
    {
      sender: 'Mme Sophie Garnier',
      content: 'Rappel : Mise à jour majeure du système informatique le 8 mai de 13h à 16h.',
      time: '08h15'
    }
  ];

  stats = [
    {
      icon: 'school',
      title: 'Étudiants',
      value: '12,684'
    },
    {
      icon: 'person',
      title: 'Enseignants',
      value: '12,379'
    },
    {
      icon: 'groups',
      title: 'Personnel',
      value: '300'
    },
    {
      icon: 'check_circle',
      title: 'Statut',
      value: 'Ouverte'
    }
  ];
}
