import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [MatCardModule, RouterLink],
  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.scss'
})
export class ItineraryComponent {
  requestId: string | null = '';
  itinerary: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.requestId = this.route.snapshot.paramMap.get('id') || '';
     this.itinerary = {
      id: this.requestId,
      destination: 'Mumbai',
      dates: '12 Apr - 15 Apr',
      segments: [
        {
          type: 'Flight',
          from: 'Ahmedabad',
          to: 'Mumbai',
          time: '10:00 AM'
        },
        {
          type: 'Return Flight',
          from: 'Mumbai',
          to: 'Ahmedabad',
          time: '6:00 PM'
        }
      ],
      stay: {
        hotel: 'Taj Hotel',
        checkIn: '12 Apr',
        checkOut: '15 Apr'
      },
      notes: 'Client meeting and presentation'
    };

  }

}
