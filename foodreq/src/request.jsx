import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CookieCard from './CookieCard';
import NotificationModal from './NotificationModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const RequestPage = () => {
  const location = useLocation();
  const { itemName, itemDescription, itemQuantity } = location.state || { itemName: 'Unknown Item', itemDescription: 'No Description', itemQuantity: 0 }; // Default to 'Unknown Item' if no state is provided
  const requesterName = "John Doe"; // Replace with the actual name of the requester

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show the modal when the component mounts
    setShowModal(true);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h1>Pending Donation Requests</h1>
          <CookieCard 
            requesterName={requesterName} 
            foodName={itemName} 
            foodDescription={itemDescription}
            foodQuantity={itemQuantity}
          />
        </div>
      </div>
      <NotificationModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        requesterName={requesterName} 
        itemName={itemName} 
      />
    </div>
  );
};

export default RequestPage;
