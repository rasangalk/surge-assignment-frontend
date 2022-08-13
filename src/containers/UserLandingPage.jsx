import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UserLandingPage = () => {
  // Stores first name
  const [FirstName, setFirstName] = useState("");

  // Stores last name
  const [LastName, setLastName] = useState("");

  // Stores Date of birth
  const [DOB, setDOB] = useState("08/10/2022");

  // Stores password
  const [Password, setPassword] = useState("");

  // Stores re entering password
  const [RePassword, setRePassword] = useState("");

  // Stores mobile phone number
  const [MobileNumber, setMobileNumber] = useState(0);

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

  const Success = (msg) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const navigate = useNavigate();

  const { id } = useParams();

  const handleCreate = () => {
    if (
      FirstName === "" ||
      LastName === "" ||
      DOB === "" ||
      Password === "" ||
      RePassword === ""
    ) {
      ErrMsg("Please fill required fields!");
    } else if (MobileNumber === 0) {
      ErrMsg("Please fill required fields!");
    } else if (Password !== RePassword) {
      ErrMsg("Please enter matching passwords!");
    } else if (Password.length < 6) {
      ErrMsg("Password should contain more than six characters");
    } else if (MobileNumber.length < 10) {
      ErrMsg("Invalid mobile number");
    } else {
      axios
        .patch(`http://localhost:2000/api/user/${id}`, {
          firstName: FirstName,
          lastName: LastName,
          dateOfBirth: DOB,
          mobile: MobileNumber,
          password: Password,
          status: true,
        })
        .then(function (response) {
          Success("done!");
          setTimeout(() => {
            navigate(`/`);
          }, 2000);
        })
        .catch(function (error) {
          ErrMsg("Internal server error!");
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
          margin: "40px",
          backgroundColor: "#fafafa",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <Avatar></Avatar>
          <Typography variant="h6" fontWeight={300}>
            User Profile
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Box>
              <TextField
                fullWidth
                required
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <TextField
                fullWidth
                required
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  fullWidth
                  required
                  label="Date of Birth"
                  value={DOB}
                  onChange={(newValue) => {
                    setDOB(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <TextField
                required
                fullWidth
                id="outlined-basic"
                label="Mobile Number"
                variant="outlined"
                onChange={(e) => setMobileNumber(parseInt(e.target.value))}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <TextField
                required
                fullWidth
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <TextField
                required
                fullWidth
                type="password"
                id="outlined-basic"
                label="Re-Password"
                variant="outlined"
                onChange={(e) => setRePassword(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Button
                fullWidth
                variant="contained"
                sx={{ marginTop: "20px" }}
                onClick={handleCreate}
              >
                Create
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserLandingPage;
