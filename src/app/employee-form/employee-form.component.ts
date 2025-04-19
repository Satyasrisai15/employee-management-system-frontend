import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  editId: number|null = null;
  constructor(private fb: FormBuilder, private svc: EmployeeService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {}
  ngOnInit(){
    this.employeeForm = this.fb.group({name:['',Validators.required],position:['',Validators.required],department:['',Validators.required],salary:['',Validators.required]});
    this.route.queryParams.subscribe(q=>{if(q['id']){this.editId=+q['id'];this.svc.getById(this.editId).subscribe(data=>this.employeeForm.patchValue(data));}});
  }
  onSubmit(){
    const op = this.editId ? this.svc.update(this.editId,this.employeeForm.value) : this.svc.create(this.employeeForm.value);
    op.subscribe({
      next:()=>{this.toastr.success(this.editId?'Updated!':'Created!','Success');this.router.navigate(['/employees']);},
      error:()=>{this.toastr.error('Operation failed','Error');}
    });
  }
}