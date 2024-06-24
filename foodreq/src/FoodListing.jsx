// import React, { useState } from 'react';

// function FoodListing({ foodItems }) {
//   const [requestedItems, setRequestedItems] = useState([]);

//   const handleRequest = (itemName) => {
//     alert(`Request for ${itemName} sent!`);
//     setRequestedItems([...requestedItems, itemName]);
//     // You can implement further logic for handling requests here
//   };

//   return (
//     <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//       {foodItems.map((item, index) => (
//         <div key={index} className="col">
//           <div className={`card h-100 shadow rounded p-3 ${requestedItems.includes(item.ItemName) ? 'bg-light disabled' : ''}`}>
//             <div className="card-body d-flex flex-column justify-content-between">
//               <div>
//                 <h5 className="card-title">{item.ItemName}</h5>
//                 <p className="card-text">
//                   <strong>Quantity:</strong> {item.Quantity}<br />
//                   <strong>Description:</strong> {item.Description}<br />
//                   <strong>Time Cooked:</strong> {item.DateCooked}<br />
//                   <strong>Address:</strong> {item.Address}
//                 </p>
//               </div>
//               <button onClick={() => handleRequest(item.ItemName)} className="btn btn-primary mt-2 align-self-end" disabled={requestedItems.includes(item.ItemName)}>
//                 {requestedItems.includes(item.ItemName) ? 'Requested' : 'Request'}
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default FoodListing;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons'; // Import the desired icon
// import './FoodListing.css'; // Import CSS file for custom styling if needed

function FoodListing({ foodItems = [] }) { // Set default value to an empty array
  const [requestedItems, setRequestedItems] = useState([]);
  const navigate = useNavigate();

  const sendNotificationToDonor = (itemName) => {
    // Replace this with actual notification logic (e.g., send an email, push notification, etc.)
    alert(`Notification to donor: Someone has requested the item ${itemName}`);
  };

  const handleRequest = (itemName, itemDescription, itemQuantity) => {
    alert(`Request for ${itemName} sent!`);
    setRequestedItems([...requestedItems, itemName]);
    sendNotificationToDonor(itemName);
    // You can implement further logic for handling requests here
    
    // Stall for 1 minute (60000 milliseconds) before navigating
    setTimeout(() => {
      navigate('/request', { state: { itemName, itemDescription, itemQuantity } }); // Navigate to the request page with the item details
    }, 5000);
  };

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {foodItems.map((item, index) => (
        <div key={index} className="col">
          <div className={`card h-100 shadow rounded p-3 ${requestedItems.includes(item.ItemName) ? 'bg-light disabled' : ''}`}>
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title">{item.ItemName}</h5>
                <p className="card-text">{item.Description}</p>
                <p className="card-text"><strong>Quantity:</strong> {item.Quantity}</p>
                <p className="card-text"><strong>Date Cooked:</strong> {item.DateCooked}</p>
                <p className="card-text"><strong>Address:</strong> {item.Address}</p>
              </div>
              <button
                className="btn btn-primary mt-3"
                onClick={() => handleRequest(item.ItemName, item.Description, item.Quantity)}
                disabled={requestedItems.includes(item.ItemName)}
              >
                <FontAwesomeIcon icon={faUtensils} className="me-2" />
                {requestedItems.includes(item.ItemName) ? 'Requested' : 'Request'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FoodListing;







// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUtensils } from '@fortawesome/free-solid-svg-icons';

// function FoodListing() {
//   const [foodItems, setFoodItems] = useState([]);
//   const [requestedItems, setRequestedItems] = useState([]);

//   useEffect(() => {
//     // Fetch food items from the API when the component mounts
//     fetch('`http://localhost:5282/api/FoodItem/AddItem`') // Replace with your actual API endpoint
//       .then(response => response.json())
//       .then(data => setFoodItems(data))
//       .catch(error => console.error('Error fetching food items:', error));
//   }, []);

//   const handleRequest = (itemName) => {
//     alert(`Request for ${itemName} sent!`);
//     setRequestedItems([...requestedItems, itemName]);
//     // You can implement further logic for handling requests here
//   };

//   return (
//     <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//       {foodItems.map((item, index) => (
//         <div key={index} className="col">
//           <div className={`card h-100 shadow rounded p-3 ${requestedItems.includes(item.ItemName) ? 'bg-light disabled' : ''}`}>
//             <div className="card-body d-flex flex-column justify-content-between">
//               <div>
//                 <h5 className="card-title">{item.ItemName}</h5>
//                 <p className="card-text">
//                   <strong>Quantity:</strong> {item.Quantity}<br />
//                   <strong>Description:</strong> {item.Description}<br />
//                   <strong>Time Cooked:</strong> {item.DateCooked}<br />
//                   <strong>Address:</strong> {item.Address}
//                 </p>
//               </div>
//               <button onClick={() => handleRequest(item.ItemName)} className="btn btn-primary mt-2 align-self-end" disabled={requestedItems.includes(item.ItemName)}>
//                 {requestedItems.includes(item.ItemName) ? 'Requested' : <><FontAwesomeIcon icon={faUtensils} /> Request</>}
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default FoodListing;
