
import './GuestSelectorCombo.css'
import React from 'react';
const GuestSelectorCombo = ({ rooms = 1, adults = 1, children = 0, onChange }) => {
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
    <div className="GuestSelectorCombo-guest-selector">
      <div className="GuestSelectorCombo-guest-display" onClick={() => setIsOpen(!isOpen)}>
         {values.adults} người lớn
        {values.children > 0 && ` · ${values.children} trẻ em`}
      </div>
      
      {isOpen && (
        <div className="GuestSelectorCombo-guest-dropdown">
          <div className="GuestSelectorCombo-guest-option">
            {/* <div>
              <h4>Phòng</h4>
              
            </div> */}
            <Counter 
              value={values.rooms}
              onDecrease={() => handleChange('rooms', -1)}
              onIncrease={() => handleChange('rooms', 1)}
              min={1}
            />
          </div>

          <div className="GuestSelectorCombo-guest-option">
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

          <div className="GuestSelectorCombo-guest-option">
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
  <div className="GuestSelectorCombo-counter">
    <button 
      type="button"
      className="GuestSelectorCombo-counter-btn" 
      onClick={onDecrease}
      disabled={value === min}
    >
      -
    </button>
    <span className="GuestSelectorCombo-counter-value">{value}</span>
    <button 
     type="button"
    className="GuestSelectorCombo-counter-btn" 
    onClick={onIncrease}>
      +
    </button>
  </div>
);


export default GuestSelectorCombo;