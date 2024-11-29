// src/components/ListItem.tsx
import React from 'react';
import { Maintenance } from '../pages/Home'; // Maintenance türünü import edin

interface ListItemProps extends Maintenance {}

const withBackgroundColor = (WrappedComponent: React.FC<ListItemProps>) => {
  return (props: ListItemProps) => {
    let backgroundColor = 'white';

    if (props.monthlyFee < 1000) {
      backgroundColor = 'green';
    } else if (props.monthlyFee > 1000 && props.monthlyFee <= 5000) {
      backgroundColor = 'blue';
    } else if (props.monthlyFee > 5000) {
      backgroundColor = 'red';
    }

    return (
      <div style={{ backgroundColor }}>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withBackgroundColor;