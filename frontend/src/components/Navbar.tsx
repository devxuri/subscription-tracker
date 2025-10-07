import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, getIdToken } = useAuth(); // Access getIdToken from context
    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error("Failed to logout:", err);
        }
    };

    useEffect(() => {
        getIdToken?.().then(token => {
            if (token) console.log("ID Token:", token); // For backend debugging purposes
        });
    }, [getIdToken]);

    return (
        <header>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl p-4">
                    <a href="/landing" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="./vite.svg" className="h-8" alt="Tracker logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Subscription Tracker</span>
                    </a>
                    <p>{user ? `Welcome, ${user.email}!` : ""}</p>
                    <div className='flex items-center space-x-6'>
                        <p className='text-sm font-normal text-gray-400'>
                            <a href='/signup'>Sign Up</a>
                        </p>
                        <p className='text-sm font-normal text-gray-400'>
                            <a href='/login'>Log In</a>
                        </p>
                        {user && (
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </nav>
            {user && (
                <nav className="bg-gray-50 dark:bg-gray-700">
                    <div className="max-w-screen-2xl px-4 py-3 mx-auto">
                        <div className="flex items-center">
                            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                                <li>
                                    <a href="/subscriptions" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Subscriptions</a>
                                </li>
                                <li>
                                    <a href="/calendar" className="text-gray-900 dark:text-white hover:underline">Calendar</a>
                                </li>
                                <li>
                                    <a href="/analytics" className="text-gray-900 dark:text-white hover:underline">Analytics</a>
                                </li>
                                <li>
                                    <a href="/integrations" className="text-gray-900 dark:text-white hover:underline">Integrations</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )}
        </header>
    );
}

export default Navbar;