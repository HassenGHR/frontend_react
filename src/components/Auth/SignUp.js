import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css"; // Import your CSS module
import AuthContext from "../../store/auth-context";
import Message from "../Message";

const SignUp = () => {
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    // Add your form submission logic here, such as sending data to the server
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
       
        // Registration successful, now log in the user
        const loginResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });

        if (loginResponse.ok) {
          const { token, userId, userEmail } = await loginResponse.json();
          login(token, userId, userEmail);
        
        } else {
          // Handle login error
          setError('Invalid email or password. Please try again.');
        }
      } else {
        // Handle registration error
        setError('Failed to sign up. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // After setting the user as authenticated, navigate to the home page
    navigate("/");
  };
    return (
        <div className={`${styles.registerContainer} ${styles.container}`}>
          <div className={styles.formContainer}>
            <div className={styles.form}>
              <h2 className={styles.formTitle}>Register</h2>
              {error && <Message variant="error">{error}</Message>}
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="name">
                    Name
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
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
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    className={styles.input}
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button className={styles.button} type="submit" >
                  Register
                </button>
              </form>
              <div className={styles.textCenter}>
                <p className={styles.grayText}>Already have an account?</p>
                <Link to="/login" className={styles.link}>
                  Login here
                </Link>
              </div>
            </div>
          </div>
        </div>
      );

};

export default SignUp;
