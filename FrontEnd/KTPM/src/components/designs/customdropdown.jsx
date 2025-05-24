import React, { useState, useRef, useEffect } from 'react';
import './CustomDropdown.css';

export const CustomDropdown = ({ label, items = [] }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen(prev => !prev);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item) => {
    setOpen(false);
    if (typeof item === 'string') {
      // Nếu item là chuỗi, chuyển hướng như cũ
      window.location.href = `/${item.toLowerCase()}`;
    } else if (typeof item === 'object' && item.action) {
      // Nếu item là object có action thì gọi action
      item.action();
    }
  };

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <a className="dropdown-toggle" onClick={toggleDropdown}>
        {label}
      </a>
      {open && (
        <ul className="dropdown-menu">
          {items.map((item, i) => {
            const label = typeof item === 'string' ? item : item.label;
            return (
              <li key={i} onClick={() => handleItemClick(item)}>
                <span className="dropdown-item">{label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
