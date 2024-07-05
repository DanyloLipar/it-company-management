import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addEmployee, updateEmployee } from '../../store/employee.actions';
import { selectEmployeeById } from '../../store/employee.selectors';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = { id: 0, name: '', email: '' };
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const employeeId = Number(params.get('id'));

      if (employeeId) {
        this.isEditMode = true;
        this.store
          .select(selectEmployeeById(Number(employeeId)))
          .subscribe((employee) => {
            if (employee) {
              this.employee = { ...employee };
            }
          });
      } else {
        const employees = JSON.parse(localStorage.getItem('employees') || '[]');
        console.log(employees.length > 0);
        this.employee.id = 1;

        if (employees.length > 0) {
          const biggestId = employees.reduce(
            (accValue: number, employee: Employee) => {
              if (employee.id > accValue) {
                accValue = employee.id;
              }

              return accValue;
            },
            0
          );

          this.employee.id = biggestId + 1;
        }
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.store.dispatch(updateEmployee({ employee: this.employee }));
    } else {
      this.store.dispatch(addEmployee({ employee: this.employee }));
    }
    this.router.navigate(['/employees']);
  }
}
