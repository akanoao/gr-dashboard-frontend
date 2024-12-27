import React from "react";
import { Box } from "@mui/material";
import CardItem from "./CardItem";
import { useNavigate } from "react-router-dom";

interface MainDashboardProps {
  user: {
    email: string;
    // ... other properties
  };
}

const MainDashboard: React.FC<MainDashboardProps> = () => {
  const navigate = useNavigate();

  const cards = Array(11).fill({
    title: "Certificate Sender",
    description: "Send bulk certificates easily",
  });

  const handleCardClick = (index: number) => {
    if (index === 0) {
      navigate("/certificate");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Card Container */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {cards.map((card, index) => (
          <CardItem
            key={index}
            title={card.title}
            description={card.description}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MainDashboard;
