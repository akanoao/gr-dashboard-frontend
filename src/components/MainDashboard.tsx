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

import React from "react";
import { Grid, Card, Typography, Box } from "@mui/material";

const MainDashboard: React.FC = () => {
  const cards = Array(7).fill({
    title: "Certificate Sender",
    description: "Send bulk certificates easily",
  });

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        {cards.map((card, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3} // For 4 cards per row in the first row
            lg={3}
            key={index}
            sx={{
              display: index < 4 || index >= 4 ? "block" : "none", // Adjust visibility
            }}
          >
            <Card
              sx={{
                p: 3,
                textAlign: "center",
                height: "100%",
                backgroundColor: "#f5f5f5", // Light gray background
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 150,
                  gap: 2,
                  mb: 2,
                }}
              >
                {/* Triangle */}
                <Box
                  sx={{
                    width: 0,
                    height: 0,
                    borderLeft: "25px solid transparent",
                    borderRight: "25px solid transparent",
                    borderBottom: "45px solid #e0e0e0",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 3,
                  }}
                >
                  {/* Square */}
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      backgroundColor: "#e0e0e0",
                    }}
                  />
                  {/* Circle */}
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      backgroundColor: "#e0e0e0",
                      borderRadius: "50%",
                    }}
                  />
                </Box>
              </Box>
              <Typography variant="h6" sx={{ mt: 2 }}>
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MainDashboard;