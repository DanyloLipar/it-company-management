import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Employee } from '../../models/employee.model';

export const selectEmployeeState =
  createFeatureSelector<Employee[]>('employees');

export const selectAllEmployees = createSelector(
  selectEmployeeState,
  (state: Employee[]) => state
);

export const selectEmployeeById = (employeeId: number) =>
  createSelector(selectEmployeeState, (state: Employee[]) =>
    state.find((employee: Employee) => employee.id === employeeId)
  );
