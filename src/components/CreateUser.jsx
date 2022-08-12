import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const CreateUser = () => {
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

  // Handles sending emails to users
  const sendEmail = (content) => {
    return new Promise((resolve, reject) => {
      emailjs
        .send(
          "service_mrdzr1g",
          "template_3lxb8z4",
          content,
          "q2q63ghv8PyGFr_Gf"
        )
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  // Check email validity
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  // Saving new user in the DB
  const handleCreateUser = () => {
    if (Email === "" || Password === "") {
      ErrMsg("Please fill the required fields!");
    } else if (!isValidEmail(Email)) {
      ErrMsg("Invalid email address!");
    } else {
      axios
        .post("http://localhost:2000/api/user", {
          firstName: null,
          lastName: null,
          email: Email,
          dateOfBirth: null,
          mobile: null,
          status: false,
          password: Password,
          accountType: "User",
        })
        .then(function (response) {
          const content = {
            Email,
            Password,
          };
          console.log(content);
          sendEmail(content).then(navigate("/admin"));
        })
        .catch(function (error) {
          ErrMsg("Email alredy in-use");
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
            src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
            alt=""
            width={60}
          />
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            fontWeight={300}
          >
            New User
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
          <Button
            fullWidth
            variant="contained"
            onClick={handleCreateUser}
            sx={{ marginBottom: "10px" }}
          >
            Create
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => navigate("/admin")}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateUser;
