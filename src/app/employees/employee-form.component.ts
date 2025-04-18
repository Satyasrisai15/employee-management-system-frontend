import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';

@Component({ selector: 'app-employee-form', templateUrl: './employee-form.component.html' })
export class EmployeeFormComponent implements OnInit {
  form: FormGroup;
  editMode = false;
  empId!: number;

  constructor(
    private fb: FormBuilder,
    private srv: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      department: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editMode = true;
      this.empId = +id;
      const emp = this.srv.get(this.empId)!;
      this.form.patchValue(emp);
    }
  }

  onSubmit() {
    const val = this.form.value;
    if (this.editMode) {
      this.srv.update({ ...val, id: this.empId } as Employee);
    } else {
      this.srv.add(val as Omit<Employee, 'id'>);
    }
    this.router.navigate(['/employees']);
  }
}
