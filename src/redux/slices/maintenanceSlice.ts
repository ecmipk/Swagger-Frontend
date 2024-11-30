import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Maintenance {
  id: number;
  buildingName: string;
  address: string;
  adminName: string;
  monthlyFee: number;
  description: string;
}

interface MaintenanceState {
  maintenances: Maintenance[];
}

const initialState: MaintenanceState = {
  maintenances: [],
};

const maintenanceSlice = createSlice({
  name: 'maintenance',
  initialState,
  reducers: {
    setMaintenances(state, action: PayloadAction<Maintenance[]>) {
      state.maintenances = action.payload;
    },
    addMaintenance(state, action: PayloadAction<Maintenance>) {
      state.maintenances.push(action.payload);
    },
  },
});

export const { setMaintenances, addMaintenance } = maintenanceSlice.actions;
export default maintenanceSlice.reducer;
