import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
@Injectable()
export class EmployeeService {
  private employees: Employee[] = [];
  private idCounter = 1;

  list() {
    return this.employees;
  }
  get(id: number) {
    return this.employees.find(e => e.id === id);
  }
  add(emp: Omit<Employee, 'id'>) {
    const newEmp: Employee = { ...emp, id: this.idCounter++ };
    this.employees.push(newEmp);
  }
  update(updated: Employee) {
    const idx = this.employees.findIndex(e => e.id === updated.id);
    if (idx > -1) this.employees[idx] = updated;
  }
  delete(id: number) {
    this.employees = this.employees.filter(e => e.id !== id);
  }
}
