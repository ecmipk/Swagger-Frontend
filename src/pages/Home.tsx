import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import withBackgroundColor from '../components/ListItem';

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
  const { data: maintenances, isLoading, error } = useQuery({
    queryKey: ['maintenances'],
    queryFn: async () => {
      const response = await api.get<Maintenance[]>('/maintenances');
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Maintenance List</h1>
      {maintenances?.map((maintenance) => (
        <StyledListItem key={maintenance.id} {...maintenance} />
      ))}
      <button onClick={() => window.location.href = '/add'}>Add New</button>
    </div>
  );
};

export default Home;
