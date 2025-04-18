import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { ReactiveFormsModule } from '@angular/forms';
  import { HttpClientModule } from '@angular/common/http';

  import { AppComponent } from './app.component';
  import { LoginComponent } from './login/login.component';
  import { EmployeeListComponent } from './employees/employee-list.component';
  import { EmployeeFormComponent } from './employees/employee-form.component';
  import { AuthGuard } from './services/auth.guard';
  import { AuthService } from './services/auth.service';
  import { EmployeeService } from './services/employee.service';
  import { AppRoutingModule } from './app-routing.module';

  @NgModule({
    declarations: [
      AppComponent,
      LoginComponent,
      EmployeeListComponent,
      EmployeeFormComponent
    ],
    imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule
    ],
    providers: [AuthService, EmployeeService, AuthGuard],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
