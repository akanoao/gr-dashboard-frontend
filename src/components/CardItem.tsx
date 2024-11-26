import React from 'react';
import { Box, Typography } from '@mui/material';

interface CardItemProps {
  title: string;
  description: string;
}

const CardItem: React.FC<CardItemProps> = ({ title, description }) => {
  return (
    <Box
      sx={{
        width: { xs: '80%', sm: '50%', md:'23%' },
        height: '220px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #d0d0d0',
        borderRadius: '12px',
        bgcolor: 'background.paper',
        padding: 3,
        transition: '0.3s',
        '&:hover': {
          bgcolor: '#f5f5f5',
          borderColor: '#a0a0a0',
          cursor: 'pointer',
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
          borderBottom: {xs: '30px solid #e0e0e0', sm: '40px solid #e0e0e0'},
          marginBottom: 1,
        }}
      ></Box>

      {/* Circle and Square Container */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '60%',
          gap: {xs: 2, sm: 3},
          marginBottom: 2,
        }}
      >
        {/* Square */}
        <Box
          sx={{
            width: {xs: '35px', sm:'50px'},
            height: {xs: '35px', sm:'45px'},
            backgroundColor: '#e0e0e0',
          }}
        ></Box>

        {/* Circle */}
        <Box
          sx={{
            width: {xs:'35px' ,sm: '50px'},
            height: { xs: '35px', sm: '45px' },
            borderRadius: '50%',
            backgroundColor: '#e0e0e0',
          }}
        ></Box>
      </Box>

      {/* Text Content */}
      <Typography variant="h6" fontWeight="bold" align="center" fontSize={{xs: '1rem', sm:'1.25rem'}}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" fontSize={{xs:'0.8rem', sm:'1rem'}}>
        {description}
      </Typography>
    </Box>
  );
};

export default CardItem;