import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { DevicesComponent } from './components/devices/devices.component';
import { DeviceFormComponent } from './components/device-form/device-form.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

const routes: Routes = [
  {
    path: 'employees',
    component: EmployeesComponent,
  },
  { path: 'employees/:id', component: EmployeeFormComponent },
  { path: 'employees/new', component: EmployeeFormComponent },
  {
    path: 'devices',
    component: DevicesComponent,
  },
  { path: 'devices/:id', component: DeviceFormComponent },
  { path: 'devices/new', component: DeviceFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
