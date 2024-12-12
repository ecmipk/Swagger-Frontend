import React from 'react';
import { Maintenance } from '../pages/Home';

interface ListItemProps extends Maintenance {
  isLocked: boolean; // Kilit durumu
  onLockToggle: () => void; // Kilit simgesine tıklanıldığında tetiklenen fonksiyon
}

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
      <div style={{ backgroundColor, padding: '20px', margin: '20px', borderRadius: '8px', border: '1px solid #ddd', position: 'relative' }}>
        {/* Kilit simgesi */}
        <div
          style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}
          onClick={props.onLockToggle}
        >
          <img
            src={props.isLocked ? '/locked-icon.png' : '/unlocked-icon.png'}
            alt="lock"
            style={{ width: '24px', height: '24px' }}
          />
        </div>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withBackgroundColor;
