import React from "react";

const AuthContext = React.createContext({
  isAuthenticated: false,
  userId: null,
  userEmail: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
