/*import { Link } from 'react-router-dom';
import logo from "../assets/Logo/bgremoved_logo.png";

const MainDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Main Dashboard</h1>

        <div className="max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg mx-auto">
          <Link to="/certificate">
            <img
              className="w-full h-48 object-cover"
              src={logo}
              alt="Card Image"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-center">Certificate Sender</h2>
              
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;*/


import React from 'react';
import { Box, Typography } from '@mui/material';

const MainDashboard: React.FC = () => {
  const cards = Array(11).fill({
    title: "Certificate Sender",
    description: "Send bulk certificates easily",
  }); 

  return (
    <Box sx={{ padding: 4 }}>
      {/* Card Container */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap', // Allows wrapping to the next line
          gap: 2,
          justifyContent: 'center',
            // Align cards to the center
        }}
      >
        {cards.map((card, index) => (
          <Box
            key={index}
            sx={{
              width: { xs: '60%', sm: '23%' }, // 23% width ensures 4 cards fit in one row
              height: '220px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border:'1px solid #d0d0d0',
              borderRadius: '12px',
              
              bgcolor: 'background.paper',
              padding: 3,
              transition: '0.3s', // Smooth transition for hover effect
              '&:hover': {
                bgcolor: '#f5f5f5',
                borderColor: '#a0a0a0', 
                cursor: 'pointer', // Change cursor to pointer on hover
              },
            }}
          >
            {/* Triangle */}
            <Box
              sx={{
                width: 0,
                height: 0,
                borderLeft: '25px solid transparent',
                borderRight: '25px solid transparent',
                borderBottom: '40px solid #e0e0e0',
                marginBottom: 1, // Space below the triangle
              }}
            ></Box>

            {/* Circle and Square Container */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '60%',
                gap: 3, // Controls the spacing between circle and square
                marginBottom: 2,
              }}
            >
              {/* Square */}
              <Box
                sx={{
                  width: '50px',
                  height: '45px',
                  backgroundColor: '#e0e0e0',
                }}
              ></Box>

              {/* Circle */}
              <Box
                sx={{
                  width: '50px',
                  height: '45px',
                  borderRadius: '50%',
                  backgroundColor: '#e0e0e0',
                }}
              ></Box>
            </Box>

            {/* Text Content */}
            <Typography variant="h6" fontWeight="bold" align="center">
              {card.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              {card.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MainDashboard;