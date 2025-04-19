import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  private readonly LOGIN_API = 'http://localhost:8080/auth/login';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.http
      .post(
        this.LOGIN_API,
        this.loginForm.value,
        { responseType: 'text' }
      )
      .subscribe({
        next: (res: string) => {
          const token = res.startsWith('Bearer ')
            ? res.substring(7).trim()
            : res.trim();

          localStorage.setItem('jwt_token', token);

          this.toastr.success('Logged in successfully', 'Success');
          this.router.navigate(['/dashboard']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.toastr.warning('Wrong username or password', 'Login Failed');
          } else {
            this.toastr.error('Unexpected error', 'Login Failed');
          }
        }
      });
  }
}
