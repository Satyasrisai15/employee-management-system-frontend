import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  employee: any;
  constructor(private route: ActivatedRoute, private svc: EmployeeService, private router: Router) {}
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.svc.getById(id).subscribe(data => this.employee = data);
  }
  delete() { this.svc.delete(this.employee.id).subscribe(() => this.router.navigate(['/employees'])); }
  edit() { this.router.navigate(['/employees/add'], { queryParams: { id: this.employee.id } }); }
}