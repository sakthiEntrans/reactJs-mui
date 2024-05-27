import React from 'react';
import Box from '@mui/material/Box';
import Container from './components/Container';

function App() {
  return (
    
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"  // Full viewport height
      bgcolor="#121212"  // Optional: background color for better visibility
    >
     
      <Container />
    </Box>
  );
}

export default App;
