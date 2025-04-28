import React from 'react';

const Register = () => {
  return (
    <div>
      <h2>Register</h2>
      <form>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
