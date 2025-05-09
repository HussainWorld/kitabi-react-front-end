import { createContext, useState } from 'react';

const UserContext = createContext();

const getUserFromToken = () => {
  const token = localStorage.getItem('token');

  if (!token) return null;

  try {
    // Extract the payload part of the JWT (second part)
    const payload = token.split('.')[1];

    // Decode the payload using base64 URL decoding
    const base64Url = payload.replace(/-/g, '+').replace(/_/g, '/'); // Correct URL-safe base64
    const decoded = atob(base64Url);

    // Parse the decoded string into an object (assuming it's JSON)
    return JSON.parse(decoded).payload;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

function UserProvider({ children }) {
  const [user, setUser] = useState(getUserFromToken());

  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };




// import { createContext, useState } from 'react';

// const UserContext = createContext();

// const getUserFromToken = () => {
//   const token = localStorage.getItem('token');

//   if (!token) return null;

//   return JSON.parse(atob(token.split('.')[1])).payload;
// };

// function UserProvider({ children }) {
//   const [user, setUser] = useState(getUserFromToken());

//   const value = { user, setUser };

//   return (
//     <UserContext.Provider value={value}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export { UserProvider, UserContext };