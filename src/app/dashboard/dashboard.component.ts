import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private router: Router) {}
  goToAdd() { this.router.navigate(['/employees/add']); }
  goToList() { this.router.navigate(['/employees']); }
}