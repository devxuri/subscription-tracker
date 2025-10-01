import React from 'react';
import '../App.css'
import { useAuth } from '../context/AuthContext';

function Dashboard() {
    const { user, logout } = useAuth();
    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error("Failed to logout:", err);
        }
    };
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

            <div>
                <p className="text-white">Welcome, {user?.email}!</p>
            </div>

            {user && (
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                >
                    Logout
                </button>
            )}
        </div>
    );
}

export default Dashboard;
