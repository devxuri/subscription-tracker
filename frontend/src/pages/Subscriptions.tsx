import React from 'react';
import '../App.css'
import { useAuth } from '../context/AuthContext';

function Subscriptions() {
    const { user } = useAuth();

    return (
        <div className="subscriptions-page">
            Subscriptions page
        </div>
    );
}

export default Subscriptions;
