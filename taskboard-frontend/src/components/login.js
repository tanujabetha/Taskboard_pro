import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // State variables to store input values
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Hook to navigate programmatically after login
  const navigate = useNavigate();

  // Handles changes in input fields
  const handleChange = (e) => {
    setFormData({
      ...formData, // keep existing data
      [e.target.name]: e.target.value, // update the changed field
    });
  };

  // Called when form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      // Call your backend's login endpoint
      const response = await axios.post('/api/auth/login', formData);

      // Store the JWT token in browser's local storage
      localStorage.setItem('token', response.data.token);

      // Optional: Store user info if you want
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect to dashboard/taskboard
      navigate('/dashboard');
    } catch (err) {
      alert(err.response.data.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '100px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
