import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Device } from '../../../models/device.model';
import {
  loadDevices,
  deleteDevice,
  linkDeviceToEmployee,
} from '../../store/device.actions';
import { Router } from '@angular/router';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {
  devices: Observable<Device[]>;
  employees: Observable<Employee[]>;
  filteredDevices: Observable<Device[]>;
  displayedColumns: string[] = [
    'id',
    'type',
    'description',
    'remove',
    'employee',
  ];

  constructor(
    private store: Store<{ devices: Device[]; employees: Employee[] }>,
    private router: Router
  ) {
    this.employees = this.store.pipe(select('employees'));
    this.devices = this.store.pipe(select('devices'));
    this.filteredDevices = this.devices;
  }

  ngOnInit() {
    this.loadDevices();
  }

  loadDevices() {
    const devices = JSON.parse(localStorage.getItem('devices') || '[]');
    this.store.dispatch(loadDevices({ devices }));
  }

  removeDevice(id: number) {
    this.store.dispatch(deleteDevice({ id }));
  }

  navigateToDeviceDetail(deviceId: number) {
    this.router.navigate(['/devices', deviceId]);
  }

  linkDeviceToEmployee(deviceId: number, employeeId: number) {
    this.store.dispatch(linkDeviceToEmployee({ deviceId, employeeId }));
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredDevices = this.devices.pipe(
      map((devices) =>
        devices.filter(
          (device) =>
            device.type.toLowerCase().includes(searchTerm) ||
            device.description.toLowerCase().includes(searchTerm)
        )
      )
    );
  }
}
