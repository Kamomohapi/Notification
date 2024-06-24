import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CookieCard = ({ requesterName, foodName, foodDescription, onDecline, requestId, serverResponse }) => {
    const [acceptMessage, setAcceptMessage] = useState('');
    const [declineMessage, setDeclineMessage] = useState('');
    const [timer, setTimer] = useState(0);
    const [showCard, setShowCard] = useState(true);

    // Function to handle responding to the request
    const respondToRequest = async (accepted) => {
        try {
            const response = await axios.post('http://localhost:5282/notifications', { requestId, accepted });
            if (response.status === 200) {
                if (accepted) {
                    setAcceptMessage('Your request has been accepted.');
                    setTimer(32 * 60); // 32 minutes in seconds
                } else {
                    setDeclineMessage('Your request has been declined.');
                    if (typeof onDecline === 'function') {
                        onDecline(); // Call the callback function provided by the parent component
                    } else {
                        console.error('onDecline is not a function');
                    }
                }
                setShowCard(false); // Hide the card after accepting or declining
            } else {
                console.error('Failed to respond to request:', response.data);
            }
        } catch (error) {
            console.error('Error responding to request:', error.response || error.message || error);
        }
    };

    // Effect to update accept message based on timer
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    // Effect to update accept message when timer changes
    useEffect(() => {
        if (timer > 0) {
            const minutes = Math.floor(timer / 60);
            const seconds = timer % 60;
            setAcceptMessage(`Your request has been accepted. Expires in ${minutes} minutes and ${seconds} seconds.`);
        } else {
            setAcceptMessage('');
        }
    }, [timer]);

    return (
        <div>
            {showCard && (
                <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: 'rgba(50, 50, 50, 0.2)' }}>
                    <div className="card text-center border" style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Brighter white color
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        borderRadius: '20px',
                        width: '300px', // Decreased width
                        height: '200px', // Decreased height
                        margin: 'auto' // Center the card horizontally
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                        }}
                    >
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '100px', width: '100%' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="red" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                        </div>
                        <p className="cookieHeading" style={{ fontWeight: 'bold' }}>Pending Donation Request!</p>
                        <p className="cookieDescription" style={{ fontWeight: 'bold', color: 'grey', fontSize: '0.8em' }}>
                            {requesterName} has made a request for {foodName}. {foodDescription} <br />
                        </p>
                        <div className="buttonContainer" style={{ width: '100%', justifyContent: 'center', gap: '20px' }}>
                            <button className="btn btn-info acceptButton rounded-pill" onClick={() => respondToRequest(true)}>Accept</button> {/* Change color to purple */}
                            <button className="btn btn-secondary declineButton rounded-pill" onClick={() => respondToRequest(false)}>Decline</button> {/* Change color to grey */}
                        </div>
                    </div>
                </div>
            )}
            {acceptMessage && <p>{acceptMessage}</p>}
            {declineMessage && <p>{declineMessage}</p>}
        </div>
    );
};

export default CookieCard;

// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const CookieCard = ({ requesterName, foodName, onDecline }) => {
//     const [timer, setTimer] = useState(0);
//     const [showCard, setShowCard] = useState(true);

//     const handleAccept = () => {
//         toast.success('Your request has been accepted.');
//         setTimer(32 * 60); // 32 minutes in seconds
//         setShowCard(false); // Hide the card after accepting
//     };

//     const handleDecline = () => {
//         toast.error('Your request has been declined.');
//         if (typeof onDecline === 'function') {
//             onDecline(); // Call the callback function provided by the parent component
//         } else {
//             console.error('onDecline is not a function');
//         }
//         setShowCard(false); // Hide the card after declining
//     };

//     useEffect(() => {
//         let interval;
//         if (timer > 0) {
//             interval = setInterval(() => {
//                 setTimer(prevTimer => prevTimer - 1);
//             }, 1000);
//         }
//         return () => clearInterval(interval);
//     }, [timer]);

//     useEffect(() => {
//         if (timer > 0) {
//             const minutes = Math.floor(timer / 60);
//             const seconds = timer % 60;
//             toast.info(`Your request has been accepted. Expires in ${minutes} minutes and ${seconds} seconds.`);
//         }
//     }, [timer]);

//     return (
//         <div>
//             <ToastContainer />
//             {showCard && (
//                 <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: 'rgba(50, 50, 50, 0.2)' }}>
//                     <div className="card text-center border" style={{ 
//                         backgroundColor: 'rgba(255, 255, 255, 0.8)', // Brighter white color
//                         boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
//                         transition: 'transform 0.2s, box-shadow 0.2s',
//                         borderRadius: '20px',
//                         width: '300px', // Decreased width
//                         height: '200px', // Decreased height
//                         margin: 'auto' // Center the card horizontally
//                     }}
//                     onMouseEnter={(e) => {
//                         e.currentTarget.style.transform = 'scale(1.05)';
//                         e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
//                     }}
//                     onMouseLeave={(e) => {
//                         e.currentTarget.style.transform = 'scale(1)';
//                         e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
//                     }}
//                     >
//                         <div className="d-flex justify-content-center align-items-center" style={{ height: '100px', width: '100%' }}>
//                             <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="red" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
//                                 <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
//                             </svg>
//                         </div>
//                         <p className="cookieHeading" style={{ fontWeight: 'bold' }}>Pending Donation Request!</p>
//                         <p className="cookieDescription" style={{ fontWeight: 'bold', color: 'grey', fontSize: '0.8em' }}>
//                             {requesterName} has made a request for {foodName}<br />
//                         </p>
//                         <div className="buttonContainer" style={{ width: '100%', justifyContent: 'center', gap: '20px'}}>
//                             <button className="btn btn-info acceptButton rounded-pill" onClick={handleAccept}>Accept</button> {/* Change color to purple */}
//                             <button className="btn btn-secondary declineButton rounded-pill" onClick={handleDecline}>Decline</button> {/* Change color to grey */}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CookieCard;
