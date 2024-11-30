import React, { useState } from 'react';
import api from '../services/api';
import { useMutation } from '@tanstack/react-query';

const AddNew: React.FC = () => {
  const [formData, setFormData] = useState({
    buildingName: '',
    address: '',
    adminName: '',
    monthlyFee: 0,
    description: '',
  });

  const mutation = useMutation({
    mutationFn: async () => {
      await api.post('/maintenance', formData);
    },
    onSuccess: () => {
      alert('New maintenance added successfully');
      window.location.href = '/';
    },
    onError: (error) => {
      console.error('Error adding new maintenance:', error);
      alert('Failed to add new maintenance');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Maintenance</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="buildingName" style={{ display: 'block', marginBottom: '8px' }}>Building Name</label>
          <input
            type="text"
            name="buildingName"
            id="buildingName"
            placeholder="Enter building name"
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="address" style={{ display: 'block', marginBottom: '8px' }}>Address</label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Enter address"
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="adminName" style={{ display: 'block', marginBottom: '8px' }}>Admin Name</label>
          <input
            type="text"
            name="adminName"
            id="adminName"
            placeholder="Enter admin name"
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="monthlyFee" style={{ display: 'block', marginBottom: '8px' }}>Monthly Fee</label>
          <input
            type="number"
            name="monthlyFee"
            id="monthlyFee"
            placeholder="Enter monthly fee"
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '8px' }}>Description</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Enter description"
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            required
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNew;
