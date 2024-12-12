import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import ListItem from '../components/ListItem';
import withBackgroundColor from '../components/withBackgroundColor';

export interface Maintenance {
  id: number;
  buildingName: string;
  address: string;
  adminName: string;
  monthlyFee: number;
  description: string;
}

const Home: React.FC = () => {
  const [lockedItems, setLockedItems] = useState<Set<number>>(new Set()); // Kilitli kartlar için state

  const { data: maintenances, isLoading, error } = useQuery({
    queryKey: ['maintenances'],
    queryFn: async () => {
      const response = await api.get<Maintenance[]>('/maintenances');
      return response.data;
    },
  });

  const handleLockToggle = (id: number) => {
    setLockedItems((prevState) => {
      const updatedSet = new Set(prevState);
      if (updatedSet.has(id)) {
        updatedSet.delete(id);
      } else {
        updatedSet.add(id);
      }
      return updatedSet;
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const StyledListItem = withBackgroundColor(ListItem); // Arka plan rengini ve kilit simgesini ekleyen HOC

  return (
    <div>
      <h1>Maintenance List</h1>
      {maintenances?.map((maintenance) => (
        <StyledListItem
          key={maintenance.id}
          {...maintenance}
          isLocked={lockedItems.has(maintenance.id)} // Kilitli olup olmadığını kontrol et
          onLockToggle={() => handleLockToggle(maintenance.id)} // Kilidi değiştir
        />
      ))}
      <button onClick={() => window.location.href = '/add'}>Add New</button>
    </div>
  );
};

export default Home;
