import { Component, OnInit } from '@angular/core';
import { MouseService } from '../../services/mouse.service';

@Component({
  selector: 'app-animated-background',
  template: `<div class="background" [style.background]="gradient"></div>`,
  styleUrls: ['./animated-background.component.css']
})
export class AnimatedBackgroundComponent implements OnInit {
  gradient = '';

  // Définir les couleurs de départ et d'arrivée
  private readonly startColor = { r: 135, g: 206, b: 245 }; // Bleu ciel
  private readonly endColor = { r: 245, g: 194, b: 231 }; // Rose bébé

  constructor(private mouseService: MouseService) {}

  ngOnInit() {
    this.animateBackground();
  }

  private animateBackground() {
    const update = () => {
      this.mouseService.updateSmoothPosition();
      this.gradient = this.calculateGradient();
      requestAnimationFrame(update);
    };
    update();
  }

  private calculateGradient(): string {
    const t = this.mouseService.currentPosition;

    // Interpolation des couleurs
    const r = Math.round(this.startColor.r + (this.endColor.r - this.startColor.r) * t);
    const g = Math.round(this.startColor.g + (this.endColor.g - this.startColor.g) * t);
    const b = Math.round(this.startColor.b + (this.endColor.b - this.startColor.b) * t);

    return `linear-gradient(
      45deg,
      rgb(${this.startColor.r}, ${this.startColor.g}, ${this.startColor.b}),
      rgb(${r}, ${g}, ${b}),
      rgb(${this.endColor.r}, ${this.endColor.g}, ${this.endColor.b})
    )`;
  }
}
