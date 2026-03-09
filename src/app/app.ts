import { Component, signal } from '@angular/core';
import { TripDisplayComponent } from './features/trips/trip-display/trip-display.component';

@Component({
  selector: 'app-root',
  imports: [TripDisplayComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('acme-explorer');
}
