import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Email
  const [Email, setEmail] = useState("");

  // Password
  const [Password, setPassword] = useState("");

  // Use to navigate between components
  const navigate = useNavigate();

  // Error toast message
  const ErrMsg = (errMsg) => {
    toast.error(errMsg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Sign in button functionality
  const handleSignin = () => {
    // When email or passsword fields empty
    if (Email === "" || Password === "") {
      ErrMsg("Please fill the required fields!");
    }

    // Check credentials with the database
    else {
      axios
        .post("http://localhost:2000/api", {
          email: Email,
          password: Password,
        })
        .then(function (response) {
          navigate("/admin");
          console.log(response);
        })
        .catch(function (error) {
          ErrMsg("Please check the email and password!");
        });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/891/891399.png"
            alt=""
            width={40}
          />
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            fontWeight={300}
          >
            Sign in
          </Typography>
        </Box>
        <Box width={400}>
          <TextField
            required
            sx={{ marginBottom: "20px", marginTop: "20px" }}
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            sx={{ marginBottom: "30px" }}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button fullWidth variant="contained" onClick={handleSignin}>
            Sign in
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
