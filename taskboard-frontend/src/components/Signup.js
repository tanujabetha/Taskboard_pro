import React, { useState } from "react"; // React and useState hook for state management
import axiosInstance from "../api"; // our pre-configured Axios instance for API calls

// Functional component for the Signup form
const Signup = () => {
  // State to store input values for username, email, password
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // State to store success or error messages after submitting the form
  const [message, setMessage] = useState("");

  // Function to update formData state as the user types in the form fields
  const handleChange = (e) => {
    setFormData({
      ...formData, // Copy everything inside the current formData object, This is Javascript spread operator.
      [e.target.name]: e.target.value, // update the changed field
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent the default form submit behavior (page reload)
    try {
      // Make POST request to the backend signup route using Axios
      const response = await axiosInstance.post("/auth/signup", formData);

      // Show success message to the user
      setMessage(" Signup successful! Please proceed to login.");
      
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      // Handle any error returned by the backend
      const errorMsg = error.response?.data?.message || "Signup failed. Please try again.";
      setMessage(errorMsg);
    }
  };

  // JSX: the HTML-like structure we return to show UI in browser
  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <h2>Signup</h2>

      {/* Form to capture username, email, and password */}
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <button
          type="submit"
          style={{ width: "100%", padding: "0.5rem", backgroundColor: "#4CAF50", color: "white", border: "none" }}
        >
          Signup
        </button>
      </form>

      {/* Show message if available (either success or error) */}
      {message && <p style={{ marginTop: "1rem", color: "#333" }}>{message}</p>}
    </div>
  );
};

export default Signup;
