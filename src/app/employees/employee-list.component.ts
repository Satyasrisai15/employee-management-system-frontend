import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';

@Component({ selector: 'app-employee-list', templateUrl: './employee-list.component.html' })
export class EmployeeListComponent {
  employees: Employee[] = [];
  constructor(private srv: EmployeeService, private router: Router) {
    this.employees = this.srv.list();
  }
  addNew() {
    this.router.navigate(['/employee/new']);
  }
  edit(id: number) {
    this.router.navigate(['/employee/edit', id]);
  }
  delete(id: number) {
    if (confirm('Delete this employee?')) {
      this.srv.delete(id);
      this.employees = this.srv.list();
    }
  }
}
