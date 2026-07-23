import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("STAFF");

  const handleRegister = async () => {

    try {

     await register({
  name,
  email,
  password,
  role,
});
      

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert("Registration Failed");

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
          width: 420,
          p: 5,
          borderRadius: 4,
        }}
      >

        <Typography
          variant="h4"
          textAlign="center"
          mb={3}
        >
          SupplySync Register
        </Typography>

        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <TextField
          select
          fullWidth
          margin="normal"
          label="Role"
          value={role}
          onChange={(e)=>setRole(e.target.value)}
        >
          <MenuItem value="MANAGER">
            Manager
          </MenuItem>

          <MenuItem value="STAFF">
            Staff
          </MenuItem>

        </TextField>

        <Button
          fullWidth
          variant="contained"
          sx={{mt:3}}
          onClick={handleRegister}
        >
          Register
        </Button>

        <Typography
          mt={2}
          textAlign="center"
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              textDecoration:"none",
              fontWeight:"bold"
            }}
          >
            Login
          </Link>
        </Typography>

      </Paper>

    </Box>

  );

}

export default Register;