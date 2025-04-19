import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  constructor(private svc: EmployeeService, private router: Router) {}
  ngOnInit() { this.svc.getAll().subscribe(data => this.employees = data); }
  view(id: number) { this.router.navigate(['/employees', id]); }
}