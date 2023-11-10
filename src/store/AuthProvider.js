import React, { useReducer, useEffect } from 'react';
import AuthContext from './auth-context';

const initialState = {
  isAuthenticated: false,
  userId: null,
  userEmail: null,
  token: null,
};

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        userId: action.payload.userId,
        userEmail: action.payload.userEmail,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        userId: null,
        userEmail: null,
        token: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(AuthReducer, initialState);

  const login = (token, userId, userEmail) => {
    dispatch({ type: 'LOGIN', payload: { token, userId, userEmail } });
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('authToken');
  };

  useEffect(() => {
    // Check for stored token on initial load
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      // Decode the token to get user information if needed
      // For simplicity, you can also just set isAuthenticated to true
      // without decoding the token
      // const decodedToken = decode(storedToken);
      login(storedToken);
      // login(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        userId: authState.userId,
        userEmail: authState.userEmail,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
