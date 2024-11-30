import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import withBackgroundColor from '../components/ListItem';
import { useDispatch, useSelector } from 'react-redux';
import { setMaintenances } from '../redux/slices/maintenanceSlice';
import { RootState } from '../redux/store';

export interface Maintenance {
  id: number;
  buildingName: string;
  address: string;
  adminName: string;
  monthlyFee: number;
  description: string;
}

const ListItem: React.FC<Maintenance> = ({ buildingName, address, adminName, monthlyFee, description }) => (
  <div>
    <h3>{buildingName}</h3>
    <p>{address}</p>
    <p>{adminName}</p>
    <p>Monthly Fee: {monthlyFee}</p>
    <p>{description}</p>
  </div>
);

const StyledListItem = withBackgroundColor(ListItem);

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const maintenances = useSelector((state: RootState) => state.maintenance.maintenances);

  const { data, isLoading, error } = useQuery<Maintenance[], Error>({
    queryKey: ['maintenances'],
    queryFn: async () => {
      const response = await api.get<Maintenance[]>('/maintenances');
      return response.data;
    },
  });
  
  useEffect(() => {
    if (data) {
      dispatch(setMaintenances(data));
    }
  }, [data, dispatch]);
  
  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Maintenance List</h1>
      {maintenances.map((maintenance) => (
        <StyledListItem key={maintenance.id} {...maintenance} />
      ))}
      <button onClick={() => window.location.href = '/add'}>Add New</button>
    </div>
  );
};

export default Home;
