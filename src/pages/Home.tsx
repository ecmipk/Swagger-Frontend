// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
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
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);

  useEffect(() => {
    api.get<Maintenance[]>('/maintenances')
      .then(response => setMaintenances(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

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
