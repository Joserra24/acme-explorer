import { Component, inject, signal } from '@angular/core';
import { FirebaseAuthService } from './core/services/firebase-auth.service';
import { LoginComponent } from './features/login/login.component';
import { TripDisplayComponent } from './features/trips/trip-display/trip-display.component';

@Component({
  selector: 'app-root',
  imports: [LoginComponent, TripDisplayComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly auth = inject(FirebaseAuthService);
  protected readonly title = signal('acme-explorer');
}
