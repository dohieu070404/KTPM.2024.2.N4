
// import React, { useState, useRef, useEffect } from 'react';
// import './CustomDropdown.css';

// export const CustomDropdown = ({ label, items = [] }) => {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const toggleDropdown = () => setOpen(prev => !prev);

//   const handleClickOutside = (e) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//       setOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="custom-dropdown" ref={dropdownRef}>
//       <a className="dropdown-toggle" onClick={toggleDropdown}>
//         {label}
//       </a>
//       {open && (
//         <ul className="dropdown-menu">
//           {items.map((item, i) => (
//             <li key={i}><a href="#">{item}</a></li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };



import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomDropdown.css';

export const CustomDropdown = ({ label, items = [] }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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
    navigate(`/${item.toLowerCase()}`); // điều hướng đến /login hoặc /register()
  };
  // toLowerCase(): Phương thức này chuyển tất cả các ký tự trong chuỗi item thành chữ thường (lowercase). Điều này giúp đảm bảo rằng tên của route sẽ luôn là chữ thường, bất kể người dùng nhập vào chữ hoa hay chữ thường.

  // /${item.toLowerCase()}: Đoạn mã này sẽ tạo ra một URL động. Ví dụ, nếu item là "Login", toLowerCase() sẽ biến nó thành "login", và toàn bộ URL sẽ là "/login".
  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <a className="dropdown-toggle" onClick={toggleDropdown}>
        {label}
      </a>
      {open && (
        <ul className="dropdown-menu">
          {items.map((item, i) => (
            <li key={i} onClick={() => handleItemClick(item)}>
              <span className="dropdown-item">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
