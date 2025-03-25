import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | U-DRIVE </title>
      </Helmet>

      <AppView />
    </>
  );
}

// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const SOCKET_SERVER_URL = 'http://localhost:5000';

// const App = () => {
//   const [status, setStatus] = useState('');

//   useEffect(() => {
//     const socket = io(SOCKET_SERVER_URL);

//     socket.on('connect', () => {
//       console.log('Connected to server');
//     });

//     socket.on('iio', (message) => {
//       console.log('Received status:', message);
//       setStatus(message);
//     });

//   }, []); // Empty dependency array ensures this effect runs only once

//   return (
//     <div>
//       <h1>Socket.IO Example</h1>
//       <div>Status: {status}</div>
//     </div>
//   );
// };

// export default App;
