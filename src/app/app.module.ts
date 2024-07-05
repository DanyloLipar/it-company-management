import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

import { StoreModule } from '@ngrx/store';
import { employeeReducer } from './store/employee.reducer';
import { deviceReducer } from './store/device.reducer';
import { EmployeesComponent } from './components/employees/employees.component';
import { DevicesComponent } from './components/devices/devices.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { MatSortModule } from '@angular/material/sort';
import { CdkColumnDef } from '@angular/cdk/table';
import { DeviceFormComponent } from './components/device-form/device-form.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    DevicesComponent,
    EmployeeFormComponent,
    DeviceFormComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    StoreModule.forRoot({ employees: employeeReducer, devices: deviceReducer }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatToolbarModule,
    MatSortModule,
  ],
  providers: [CdkColumnDef],
  bootstrap: [AppComponent],
})
export class AppModule {}
