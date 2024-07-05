import { Device } from '../../models/device.model';
import devicesData from '../../constants/devices.json';
import { Action, createReducer, on } from '@ngrx/store';
import {
  addDevice,
  deleteDevice,
  loadDevices,
  updateDevice,
  linkDeviceToEmployee,
} from './device.actions';

const loadStateFromLocalStorage = () => {
  const devicesJson = localStorage.getItem('devices');
  if (devicesJson) {
    const devices = JSON.parse(devicesJson) as Device[];
    return devices;
  } else {
    const initialDevices: Device[] = devicesData;
    localStorage.setItem('devices', JSON.stringify(initialDevices));
    return initialDevices;
  }
};

export const initialState: Device[] = loadStateFromLocalStorage();

const saveStateToLocalStorage = (state: Device[]) => {
  localStorage.setItem('devices', JSON.stringify(state));
};

const _deviceReducer = createReducer(
  initialState,
  on(loadDevices, (state, { devices }) => {
    saveStateToLocalStorage(devices);
    return devices;
  }),
  on(addDevice, (state, { device }) => {
    const newState = [...state, device];
    saveStateToLocalStorage(newState);
    return newState;
  }),
  on(updateDevice, (state, { device }) => {
    const newState = state.map((e: Device) =>
      e.id === device.id ? device : e
    );
    saveStateToLocalStorage(newState);
    return newState;
  }),
  on(deleteDevice, (state, { id }) => {
    const newState = state.filter((e: Device) => e.id !== id);
    saveStateToLocalStorage(newState);
    return newState;
  }),
  on(linkDeviceToEmployee, (state, { deviceId, employeeId }) => {
    const newState = state.map((device) =>
      device.id === deviceId ? { ...device, employeeId } : device
    );
    saveStateToLocalStorage(newState);
    return newState;
  })
);

export function deviceReducer(state: Device[] | undefined, action: Action) {
  return _deviceReducer(state, action);
}
