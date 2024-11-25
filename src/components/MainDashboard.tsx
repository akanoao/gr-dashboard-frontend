import React from 'react';
import { Box } from '@mui/material';
import CardItem from './CardItem';

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
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
        }}
      >
        {cards.map((card,index) => (
          <CardItem key={index} title={card.title} description={card.description} />
        ))}
        
      </Box>
    </Box>
  );
};

export default MainDashboard;