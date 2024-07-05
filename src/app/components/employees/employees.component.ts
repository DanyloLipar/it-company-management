import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../../../models/employee.model';
import { deleteEmployee, loadEmployees } from '../../store/employee.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees: Observable<Employee[]>;
  filteredEmployees: Observable<Employee[]>;
  displayedColumns: string[] = ['id', 'name', 'email', 'remove'];

  constructor(
    private store: Store<{ employees: Employee[] }>,
    private router: Router
  ) {
    this.employees = this.store.pipe(select('employees'));
    this.filteredEmployees = this.employees;
  }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    this.store.dispatch(loadEmployees({ employees }));
  }

  removeEmployee(employeeId: number) {
    this.store.dispatch(deleteEmployee({ employeeId }));
  }

  navigateToEmployeeDetail(employeeId: number) {
    this.router.navigate(['/employees', employeeId]);
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredEmployees = this.employees.pipe(
      map((employees) =>
        employees.filter(
          (employee) =>
            employee.name.toLowerCase().includes(searchTerm) ||
            employee.email.toLowerCase().includes(searchTerm)
        )
      )
    );
  }
}
