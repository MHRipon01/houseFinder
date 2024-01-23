// AuthContextProvider.js
import { useState } from 'react';
import AuthContext from './AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

  
const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
//   const navigate = useNavigate();
  const updateUserData = (newUserData) => {
    setUserData(newUserData);
  };

  const logout = () => {
    
    setUserData(null);
    // navigate('/login')
  };

  const info ={

    userData, updateUserData, logout
  }

  return (
    <AuthContext.Provider value={{info}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;


// AuthContextProvider.js
// import { useState } from 'react';
// import AuthContext from './AuthContext';

// const AuthContextProvider = ({ children }) => {
//   const [userData, setUserData] = useState(null);

//   const updateUserData = (newUserData) => {
//     setUserData(newUserData);
//   };

//   const logout = () => {
//     setUserData(null);
//     // Additional logout logic if needed
//   };

//   const contextValue = {
//     userData,
//     updateUserData,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContextProvider;
