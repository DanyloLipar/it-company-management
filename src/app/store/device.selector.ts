import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Device } from '../../models/device.model';

export const selectDeviceState = createFeatureSelector<Device[]>('devices');

export const selectAllDevices = createSelector(
  selectDeviceState,
  (state: Device[]) => state
);

export const selectDeviceById = (deviceId: number) =>
  createSelector(selectDeviceState, (state: Device[]) =>
    state.find((device: Device) => device.id === deviceId)
  );
