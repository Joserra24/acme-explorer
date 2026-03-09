import { Component } from '@angular/core';
import { Trip } from '../../trips/trip.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trip-display',
  imports: [FormsModule],
  templateUrl: './trip-display.component.html',
  styleUrl: './trip-display.component.scss',
})
export class TripDisplayComponent {
  trip: Trip = {
    id: '1',
    version: 0,
    ticker: 'TRIP-001',
    title: 'Trip to Paris',
    description: 'A wonderful trip to the city of lights.',
    price: 1200,
    city: 'Paris',
    country: 'France',
    difficulty: 'medium',
    maxParticipants: 20,
    startDate: new Date('2024-09-01'),
    endDate: new Date('2024-09-10'),
    pictures: ['/images/paris1.jpg', '/images/paris2.jpg'],
    cancelled: false,
  };

  get pictures() {
    return this.trip.pictures || [];
  }

  removeTrip() {
    this.trip.cancelled = true;
  }
}
