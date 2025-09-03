import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      You are logged in

      <div className='w-full flex items-center justify-center mt-10'>
        <p className='text-sm font-normal text-gray-400'>
          <a href='/login'>Log In</a>
        </p>
      </div>
      <div className='w-full flex items-center justify-center mt-10'>
        <p className='text-sm font-normal text-gray-400'>
          <a href='/signup'>Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default App;
