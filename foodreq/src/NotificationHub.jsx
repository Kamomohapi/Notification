import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const NotificationComponent = () => {
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5282/notifications")
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);

        newConnection.start()
            .then(() => console.log('SignalR Connected'))
            .catch(err => console.error('SignalR Connection Error: ', err));

        return () => {
            newConnection.stop();
        };
    }, []);

    useEffect(() => {
        if (connection) {
            connection.on("ReceiveNotification", (requestId) => {
                // Handle notification received from SignalR
                console.log(`Notification received for request ID: ${requestId}`);
                // Optionally, update state to show notification to user
            });

            connection.on("ReceiveResponse", (accepted) => {
                // Handle response received from SignalR for requester
                if (accepted) {
                    console.log('Request has been accepted.'); // Update UI or perform other actions
                } else {
                    console.log('Request has been declined.'); // Update UI or perform other actions
                }
            });

            connection.on("ReceiveDonorResponse", (requestId, accepted) => {
                // Handle response received from SignalR for donor
                if (accepted) {
                    console.log(`Your response to request ID ${requestId} has been accepted.`);
                } else {
                    console.log(`Your response to request ID ${requestId} has been declined.`);
                }
            });
        }
    }, [connection]);

    return (
        <div>
            {/* Your notification and response UI components */}
        </div>
    );
};

export default NotificationComponent;