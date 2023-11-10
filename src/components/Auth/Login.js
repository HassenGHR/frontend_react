import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import AuthContext from "../../store/auth-context";
import Message from "../Message";

const LoginPage = () => {
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');



  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          const { token, userId, userEmail } = await response.json();
          login(token, userId, userEmail);
          navigate("/");
        } else {
          // Handle login error
          setError('Invalid email or password. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
      
   
  };
  return (
    <div className={styles.container}>
      <div className={`${styles.formContainer} shadow-md rounded-md`}>
        <h2 className={styles.formTitle}>Login</h2>
        {error && <Message variant="error">{error}</Message>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className={styles.formButton}>
            Login
          </button>
        </form>
        <div className={styles.textCenter}>
          <p>Don't have an account?</p>
          <Link to="/SignUp" className={styles.link}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
