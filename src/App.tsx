// App.tsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import {
  useGoogleLogin,
  googleLogout,
  hasGrantedAllScopesGoogle,
} from "@react-oauth/google";
import Navbar from "./components/Navbar";
import CertificateDashboard from "./components/CertificateDashboard";
import MainDashboard from "./components/MainDashboard";
import theme from "./theme/theme";
import access from "./access.json"

interface DecodedToken {
  email: string;
  // ... other properties
}

function App() {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        if (
          !hasGrantedAllScopesGoogle(
            response,
            "https://www.googleapis.com/auth/userinfo.email"
          )
        ) {
          throw new Error("User has not granted email scope");
        }
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        if (!userInfoResponse.ok) {
          throw new Error("Failed to fetch user info");
        }

        const userInfo = await userInfoResponse.json();
        console.log("User Info:", userInfo);
        // Check if user is whitelisted
        if (userInfo.email in access) {
          setUser(userInfo);
        } else {
          alert("This account is not authorized to access the dashboard.");
          googleLogout();
        }
      } catch (error) {
        console.error("Login/User Info Error:", error);
        alert("Login failed. Please try again.");
        googleLogout();
      }
    },
    onError: (error) => {
      console.error("Google Login Failed:", error);
      alert("Login failed. Please try again.");
    },
    flow: "implicit", // Use implicit flow for access token
    scope: "https://www.googleapis.com/auth/userinfo.email", // Request email scope
  });

  useEffect(() => {
    // Initialize the login process
    const initializeLogin = () => {
      if (typeof window !== "undefined") {
        login();
      }
    };

    // Call login when the component mounts
    initializeLogin();

    // Set a timeout to re-initialize login after a short interval
    const timeoutId = setTimeout(() => {
      initializeLogin();
    }, 1000); // 1 second

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [login]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              user ? <MainDashboard user={user} /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/certificate"
            element={
              user ? (
                <CertificateDashboard user={user} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;