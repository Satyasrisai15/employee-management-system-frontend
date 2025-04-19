import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  private readonly SIGNUP_API = 'http://localhost:8080/auth/signup';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) return;

    this.http
      .post(
        this.SIGNUP_API,
        this.signupForm.value,
        { responseType: 'text' }    // ← treat the response as raw text
      )
      .subscribe({
        next: (res: string) => {
          const token = res.startsWith('Bearer ')
            ? res.substring(7).trim()
            : res.trim();

          localStorage.setItem('jwt_token', token);

          this.toastr.success('Signup successful', 'Success');
          this.router.navigate(['/dashboard']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 409) {
            this.toastr.warning('Username already exists', 'Signup Failed');
          } else {
            this.toastr.error('Unexpected error', 'Signup Failed');
          }
        }
      });
  }
}
