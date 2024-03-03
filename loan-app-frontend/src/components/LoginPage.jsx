import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from 'notistack';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3001/users");
      const users = response.data;

      // Validate login credentials
      const matchingUser = users.find(
        (user) =>
          user.email === formData.email &&
          user.password === formData.password &&
          user.role === formData.role
      );

      if (matchingUser) {
        
        const role  = matchingUser.role;
        if (role === 'user'){
          localStorage.setItem('isLoggedInUser', true);
          localStorage.setItem('userId', matchingUser.id);
          enqueueSnackbar('Logged in successfully.', { variant: 'success' });
          setFormData({
            email: "",
            password: "",
            role: "user",
          });
          setTimeout(() => {
            setLoading(false);
            window.location.href = "/userDashboard";
          }, 2000);
        } else {
          localStorage.setItem('isLoggedInAdmin', true);
          localStorage.setItem('userId', matchingUser.id);
          enqueueSnackbar('Logged in successfully.', { variant: 'success' });
          setFormData({
            email: "",
            password: "",
            role: "user",
          });
          setTimeout(() => {
            setLoading(false);
            window.location.href = "/adminDashboard";
          }, 2000);
        }
      } else {
        setFormData({
          email: "",
          password: "",
          role: "user",
        });
        enqueueSnackbar('Invalid credentials', { variant: 'error' });
      }
    } catch (error) {
      setFormData({
        email: "",
        password: "",
        role: "user",
      });
      enqueueSnackbar('Error fetching user data', { variant: 'error' });
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <div>
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
