import React, { useState } from 'react';

const TestSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log('TestSignIn rendered, email:', email, 'password:', password);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Test SignIn Component</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Email:</label><br />
        <input 
          type="email" 
          value={email}
          onChange={(e) => {
            console.log('Email changed:', e.target.value);
            setEmail(e.target.value);
          }}
          placeholder="Type your email"
          style={{ 
            padding: '10px', 
            width: '300px', 
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />
        <div>Current email: {email}</div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Password:</label><br />
        <input 
          type="password" 
          value={password}
          onChange={(e) => {
            console.log('Password changed:', e.target.value);
            setPassword(e.target.value);
          }}
          placeholder="Type your password"
          style={{ 
            padding: '10px', 
            width: '300px', 
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />
        <div>Current password: {password}</div>
      </div>

      <button 
        onClick={() => alert(`Email: ${email}, Password: ${password}`)}
        style={{ 
          padding: '10px 20px', 
          background: '#007bff', 
          color: 'white', 
          border: 'none' 
        }}
      >
        Test Values
      </button>
    </div>
  );
};

export default TestSignIn;
