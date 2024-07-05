import { createAction, props } from '@ngrx/store';
import { Device } from '../../models/device.model';

export const loadDevices = createAction(
  '[Device] Load Devices',
  props<{ devices: Device[] }>()
);

export const addDevice = createAction(
  '[Device] Add Device',
  props<{ device: Device }>()
);

export const updateDevice = createAction(
  '[Device] Update Device',
  props<{ device: Device }>()
);

export const deleteDevice = createAction(
  '[Device] Delete Device',
  props<{ id: number }>()
);

export const linkDeviceToEmployee = createAction(
  '[Device] Link Device to Employee',
  props<{ deviceId: number; employeeId: number }>()
);
