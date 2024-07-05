import { Action, createReducer, on } from '@ngrx/store';
import { Employee } from '../../models/employee.model';
import {
  loadEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from './employee.actions';
import employeesData from '../../constants/employees.json';

const loadStateFromLocalStorage = () => {
  const employeesJson = localStorage.getItem('employees');
  if (employeesJson) {
    const employees = JSON.parse(employeesJson) as Employee[];
    return employees;
  } else {
    const initialEmployees: Employee[] = employeesData;
    localStorage.setItem('employees', JSON.stringify(initialEmployees));
    return initialEmployees;
  }
};

export const initialState: Employee[] = loadStateFromLocalStorage();

const saveStateToLocalStorage = (state: Employee[]) => {
  localStorage.setItem('employees', JSON.stringify(state));
};

const _employeeReducer = createReducer(
  initialState,
  on(loadEmployees, (state, { employees }) => {
    saveStateToLocalStorage(employees);
    return employees;
  }),
  on(addEmployee, (state, { employee }) => {
    const newState = [...state, employee];
    saveStateToLocalStorage(newState);
    return newState;
  }),
  on(updateEmployee, (state, { employee }) => {
    const newState = state.map((e: Employee) =>
      e.id === employee.id ? employee : e
    );
    saveStateToLocalStorage(newState);
    return newState;
  }),
  on(deleteEmployee, (state, { employeeId }) => {
    const newState = state.filter((e: Employee) => e.id !== employeeId);
    saveStateToLocalStorage(newState);
    return newState;
  })
);

export function employeeReducer(state: Employee[] | undefined, action: Action) {
  return _employeeReducer(state, action);
}
