import React, { useState } from 'react';
import { Maintenance } from '../pages/Home';
import './ListItem.css';

interface ListItemProps extends Maintenance {
  isLocked: boolean;
  onLockToggle: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ buildingName, address, adminName, monthlyFee, description, isLocked, onLockToggle }) => {
  // State yönetimi
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    buildingName,
    address,
    adminName,
    monthlyFee,
    description
  });

  // Form inputlarını güncelleme
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Düzenlemeye başlama
  const handleEdit = () => {
    if (!isLocked) {
      setIsEditing(true);
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', margin: '10px 0', borderRadius: '8px' }}>
      
      {/* Kilit butonu */}
      <button onClick={onLockToggle}>
        {isLocked ? 'Unlock' : 'Lock'}
      </button>

      {/* Bilgilere tıklanabilir alan ekledik */}
      <div>
        <div
          onClick={handleEdit}
          style={{ cursor: isLocked ? 'not-allowed' : 'pointer', backgroundColor: '#f9f9f9', padding: '10px', marginBottom: '10px' }}
        >
          <label htmlFor="buildingName">Building Name: </label>
          {isEditing ? (
            <input
              type="text"
              name="buildingName"
              id="buildingName"
              value={formData.buildingName}
              onChange={handleChange}
              readOnly={isLocked}
              style={{ backgroundColor: isLocked ? '#f0f0f0' : 'white' }}
            />
          ) : (
            <span>{formData.buildingName}</span>
          )}
        </div>

        <div
          onClick={handleEdit}
          style={{ cursor: isLocked ? 'not-allowed' : 'pointer', backgroundColor: '#f9f9f9', padding: '10px', marginBottom: '10px' }}
        >
          <label htmlFor="address">Address: </label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              readOnly={isLocked}
              style={{ backgroundColor: isLocked ? '#f0f0f0' : 'white' }}
            />
          ) : (
            <span>{formData.address}</span>
          )}
        </div>

        <div
          onClick={handleEdit}
          style={{ cursor: isLocked ? 'not-allowed' : 'pointer', backgroundColor: '#f9f9f9', padding: '10px', marginBottom: '10px' }}
        >
          <label htmlFor="adminName">Admin Name: </label>
          {isEditing ? (
            <input
              type="text"
              name="adminName"
              id="adminName"
              value={formData.adminName}
              onChange={handleChange}
              readOnly={isLocked}
              style={{ backgroundColor: isLocked ? '#f0f0f0' : 'white' }}
            />
          ) : (
            <span>{formData.adminName}</span>
          )}
        </div>

        <div
          onClick={handleEdit}
          style={{ cursor: isLocked ? 'not-allowed' : 'pointer', backgroundColor: '#f9f9f9', padding: '10px', marginBottom: '10px' }}
        >
          <label htmlFor="monthlyFee">Monthly Fee: </label>
          {isEditing ? (
            <input
              type="number"
              name="monthlyFee"
              id="monthlyFee"
              value={formData.monthlyFee}
              onChange={handleChange}
              readOnly={isLocked}
              style={{ backgroundColor: isLocked ? '#f0f0f0' : 'white' }}
            />
          ) : (
            <span>{formData.monthlyFee}</span>
          )}
        </div>

        <div
          onClick={handleEdit}
          style={{ cursor: isLocked ? 'not-allowed' : 'pointer', backgroundColor: '#f9f9f9', padding: '10px', marginBottom: '10px' }}
        >
          <label htmlFor="description">Description: </label>
          {isEditing ? (
            <input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              readOnly={isLocked}
              style={{ backgroundColor: isLocked ? '#f0f0f0' : 'white' }}
            />
          ) : (
            <span>{formData.description}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
