// import React from 'react';
// import {  Navigate } from 'react-router-dom';

// export const ProtectedRoute = ({ element, ...props }) => {
//   const userRole = sessionStorage.getItem('userRole');

//   // Modify the logic based on your authentication state
//   const isAdmin = userRole === 'admin';

//   return isAdmin ? (
//       element
//   ) : (
//       <Navigate to="/unauthorized" replace />
//   );
// };
