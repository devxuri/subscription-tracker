import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { setDark, setLight, useSystemPreference } from '../services/colorPref';

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
            <nav>
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl p-4">
                    <a href="/landing" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="./vite.svg" className="h-8" alt="Tracker logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Subscription Tracker</span>
                    </a>
                    <p>{user ? `Welcome, ${user.email}!` : ""}</p>
                    <div className='flex items-center space-x-6'>
                        <p className='text-sm font-normal'>
                            <a href='/signup'>Sign Up</a>
                        </p>
                        <p className='text-sm font-normal'>
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
                        <nav className="p-4">
                            <button onClick={() => setDark()} className="mr-2">Dark</button>
                            <button onClick={() => setLight()} className="mr-2">Light</button>
                            <button onClick={() => useSystemPreference()}>System</button>
                        </nav>
                    </div>
                </div>
            </nav>
            {user && (
                <nav className="border-1 border-gray-400">
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