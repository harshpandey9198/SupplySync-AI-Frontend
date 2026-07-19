import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const response = await login(email, password);

      localStorage.setItem("token", response.token);
      localStorage.setItem("name", response.name);
      localStorage.setItem("email", response.email);
      localStorage.setItem("role", response.role);

      alert("Login Successful");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Invalid Email or Password");

    }

  };

  return (

    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f1f5f9",
      }}
    >

      <Paper
        sx={{
          p: 5,
          width: 400,
          borderRadius: 4,
        }}
      >

        <Typography
          variant="h4"
          mb={3}
          textAlign="center"
        >
          SupplySync Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleLogin}
        >
          Login
        </Button>

      </Paper>

    </Box>

  );

}

export default Login;