import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FoodListing from './FoodListing';
import RequestPage from './request';

function App() {
  const foodItems = [
    {
      ItemName: 'Pizza',
      Quantity: 1,
      Description: 'Delicious pizza with cheese and pepperoni toppings',
      DateCooked: '2024-06-07',
      Address: '123 Main St'
    },
    {
      ItemName: 'Salad',
      Quantity: 2,
      Description: 'Fresh salad with mixed greens and vinaigrette dressing',
      DateCooked: '2024-06-07',
      Address: '456 Elm St'
    },
    {
      ItemName: 'Lasagne',
      Quantity: 2,
      Description: 'Lasagna with rich meat sauce and cheese',
      DateCooked: '2024-06-07',
      Address: '789 Oak St'
    },
    {
      ItemName: 'Rice',
      Quantity: 2,
      Description: 'Steamed white rice',
      DateCooked: '2024-06-07',
      Address: '101 Pine St'
    },
    {
      ItemName: 'Bread',
      Quantity: 2,
      Description: 'Freshly baked bread',
      DateCooked: '2024-06-07',
      Address: '102 Maple St'
    }
  ];

  return (
    <Router>
      <div className="container">
        <h1 className="mt-5 mb-4">Food Sharing App</h1>
        <Routes>
          <Route path="/" element={<FoodListing foodItems={foodItems} />} />
          <Route path="/request" element={<RequestPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import FoodListing from './FoodListing';

// function App() {
//   return (
//     <div className="container">
//       <h1 className="mt-5 mb-4">Food Sharing App</h1>
//       <FoodListing />
//     </div>
//   );
// }

// export default App;
