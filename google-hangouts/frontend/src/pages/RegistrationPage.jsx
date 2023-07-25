import React, { useState } from 'react';

const RegistrationPage = () => {
      const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('Form data:', formData);

        try {
            const response = await fetch(`${API_ENDPOINT}/register`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log('Registration successful!', data);
              // Redirect to another page or show a success message
            } else {
              const error = await response.json();
              console.error('Registration failed:', error.msg);
              // Show an error message to the user
            }
          } catch (error) {
            console.error('Error occurred during registration:', error);
            // Show an error message to the user
          };
      };
    
      return (
        <div>
          <h1>Registration</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      );
    };
    
export default RegistrationPage