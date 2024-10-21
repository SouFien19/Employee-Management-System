// src/components/ToastNotification.js
import React, { useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Import Material Icon for approved
import CancelIcon from '@mui/icons-material/Cancel'; // Import Material Icon for rejected
import CloseIcon from '@mui/icons-material/Close'; // Import Material Icon for close button

const ToastNotification = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(); // Automatically close after 5 seconds
        }, 5000);

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [onClose]);

    const getColor = () => {
        switch (type) {
            case 'approved':
                return 'bg-green-600';
            case 'rejected':
                return 'bg-red-600';
            default:
                return 'bg-blue-600';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'approved':
                return <CheckCircleIcon className="h-6 w-6" />;
            case 'rejected':
                return <CancelIcon className="h-6 w-6" />;
            default:
                return null;
        }
    };

    return (
        <div
            className={`flex items-center justify-between p-4 mb-4 rounded-lg shadow-lg text-white transition-transform transform hover:scale-105 ${getColor()}`}
            style={{ zIndex: 9999 }} // Ensures the notification stays on top of other elements
        >
            <div className="flex items-center">
                {getIcon()}
                <p className="ml-2 text-base font-medium">{message}</p>
            </div>
            <button 
                onClick={onClose} 
                className="ml-4 text-white hover:text-gray-200 focus:outline-none"
                aria-label="Close"
            >
                <CloseIcon className="h-5 w-5" />
            </button>
        </div>
    );
};

export default ToastNotification;