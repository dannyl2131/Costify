import React, { useState } from 'react';
import Navigation from './Navigation';
import ContainerExample from './Main';
import Signup from './Signup';
import Login from './login';
import MultipleAddonsExample from './Addexpense';

export default function PageContainer() {
    const [currentPage, setCurrentPage] = useState('Main');

    const renderPage = () => {
        if (currentPage === 'Main') {
            return (
                <ContainerExample />
            );
        }
        if (currentPage === 'Signup') {
            return (
                <Signup />
            );
        }
        if (currentPage === 'Login') {
            return (
                <Login />
            )
        }    
        if (currentPage === 'Expense') {
            return (
                <MultipleAddonsExample />
            );
        }
    };

    const handlePageChange = (page) => setCurrentPage(page);

    const handleMainChange = () => {
        setCurrentPage('Main');
        window.location.reload();
    }

    return(
        <div>
            <Navigation handlePageChange={handlePageChange} handleMainChange={handleMainChange} />
            {renderPage()}
        </div>
    );
}