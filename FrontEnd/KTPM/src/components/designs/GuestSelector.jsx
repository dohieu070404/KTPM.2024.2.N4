
import './GuestSelector.css'
import React from 'react';
const GuestSelector = ({ rooms = 1, adults = 1, children = 0, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [values, setValues] = React.useState({ rooms, adults, children });

  const handleChange = (type, delta) => {
    const newValues = {
      ...values,
      [type]: Math.max(0, values[type] + delta)
    };
    
    // Validate rules
    if (type === 'rooms' && newValues.rooms < 1) return;
    if (type === 'adults' && newValues.adults < 1) return;
    
    setValues(newValues);
    onChange?.(newValues);
  };

  return (
    <div className="GuestSelector-guest-selector">
      <div className="GuestSelector-guest-display" onClick={() => setIsOpen(!isOpen)}>
        {values.rooms} phòng · {values.adults} người lớn
        {values.children > 0 && ` · ${values.children} trẻ em`}
      </div>
      
      {isOpen && (
        <div className="GuestSelector-guest-dropdown">
          <div className="GuestSelector-guest-option">
            <div>
              <h4>Phòng</h4>
              
            </div>
            <Counter 
              value={values.rooms}
              onDecrease={() => handleChange('rooms', -1)}
              onIncrease={() => handleChange('rooms', 1)}
              min={1}
            />
          </div>

          <div className="GuestSelector-guest-option">
            <div>
              <h4>Người lớn</h4>
              <p>Từ 16 trở lên</p>
            </div>
            <Counter 
              value={values.adults}
              onDecrease={() => handleChange('adults', -1)}
              onIncrease={() => handleChange('adults', 1)}
              min={1}
            />
          </div>

          <div className="GuestSelector-guest-option">
            <div>
              <h4>Trẻ em</h4>
              <p>Từ 0 - 16 tuổi</p>
            </div>
            <Counter 
              value={values.children}
              onDecrease={() => handleChange('children', -1)}
              onIncrease={() => handleChange('children', 1)}
              min={0}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const Counter = ({ value, onDecrease, onIncrease, min = 0 }) => (
  <div className="GuestSelector-counter">
    <button 
      type="button"
      className="GuestSelector-counter-btn" 
      onClick={onDecrease}
      disabled={value === min}
    >
      -
    </button>
    <span className="GuestSelector-counter-value">{value}</span>
    <button 
     type="button"
    className="GuestSelector-counter-btn" 
    onClick={onIncrease}>
      +
    </button>
  </div>
);


export default GuestSelector;