import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router} from '@angular/router';


@Component({
  selector: 'app-request-details',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.scss'
})
export class RequestDetailsComponent {
  requestId = '';

  constructor(private route: ActivatedRoute , private router: Router) {}

  ngOnInit(): void {
    this.requestId = this.route.snapshot.paramMap.get('id') || '';
  }
  goBack(): void {
    window.history.back();
  }
  goToItinerary(id: string | number): void {
   this.router.navigate(['/itinerary', id]);
  }
  goToAddexpenses(): void {
   this.router.navigate(['/add-expense']);
  }
}
