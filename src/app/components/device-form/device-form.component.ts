import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Device } from '../../../models/device.model';
import { selectDeviceById } from '../../store/device.selector';
import { addDevice, updateDevice } from '../../store/device.actions';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss'],
})
export class DeviceFormComponent implements OnInit {
  device: Device = { id: 0, type: '', description: '' };
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const deviceId = Number(params.get('id'));

      if (deviceId) {
        this.isEditMode = true;
        this.store
          .select(selectDeviceById(Number(deviceId)))
          .subscribe((device) => {
            if (device) {
              this.device = { ...device };
            }
          });
      } else {
        const devices = JSON.parse(localStorage.getItem('devices') || '[]');
        this.device.id = 1;

        if (devices.length > 0) {
          const biggestId = devices.reduce(
            (accValue: number, device: Device) => {
              if (device.id > accValue) {
                accValue = device.id;
              }

              return accValue;
            },
            0
          );

          this.device.id = biggestId + 1;
        }
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.store.dispatch(updateDevice({ device: this.device }));
    } else {
      this.store.dispatch(addDevice({ device: this.device }));
    }
    this.router.navigate(['/devices']);
  }
}
