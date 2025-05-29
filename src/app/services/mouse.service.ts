import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MouseService {
  normalizedPosition = 0.5; // Position initiale au centre
  currentPosition = 0.5;

  constructor() {
    this.initMouseTracking();
  }

  private initMouseTracking() {
    window.addEventListener('mousemove', (e) => {
      this.normalizedPosition = Math.min(1, Math.max(0, e.clientX / window.innerWidth));
    });
  }

  updateSmoothPosition() {
    const smoothingFactor = 0.08;
    this.currentPosition += (this.normalizedPosition - this.currentPosition) * smoothingFactor;
  }
}
