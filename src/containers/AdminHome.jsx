import { Add, Menu } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import axios from "axios";
import ReactLoading from "react-loading";

import {
  AppBar,
  Avatar,
  Box,
  Fab,
  IconButton,
  Modal,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import React, { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  // Store loading indicator status
  const [Loader, setLoader] = useState();

  // Store users
  const [Users, setUsers] = useState([]);

  // Store number of documents in user collection
  const [Pages, setPages] = useState();

  // Store user limit in a single page
  const [Limit, setLimit] = useState();

  // Store current page number
  const [PageNumber, setPageNumber] = useState();

  // Store searching email address
  const [Email, setEmail] = useState("");

  // Store modal open state
  const [Open, setOpen] = useState(false);

  // Store a seleted user information
  const [UserInfo, setUserInfo] = useState([]);

  // Handle pagination
  const handleChange = (event, value) => {
    setPageNumber(value);
    axios
      .get(`http://localhost:2000/api/users?page=${PageNumber}`)
      .then(function (response) {
        setUsers(response.data.users);
        setPages(parseInt(response.data.total));
        setLimit(parseInt(response.data.limit));
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // Load users
  useEffect(() => {
    axios
      .get(`http://localhost:2000/api/users?page=${PageNumber}&email=${Email}`)
      .then(function (response) {
        setUsers(response.data.users);
        setPages(parseInt(response.data.total));
        setLimit(parseInt(response.data.limit));
        setLoader("a");
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [Email, PageNumber]); // if Email or PageNumber change, useEffect will reload

  // Styled component for searchbox
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  // Styled component for search input
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,

      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  // Use to navigate between components
  const navigate = useNavigate();

  // Handles getting a single user information after clicking on a row
  const getUserInfo = (id) => {
    setOpen(true);
    axios
      .get(`http://localhost:2000/api/users/${id}`)
      .then(function (response) {
        setUserInfo(response.data.details);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Admin
          </Typography>
          <Search>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus={"autofocus"}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "93%",
            marginTop: "100px",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: "20px" }}>
            Users
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>EMAIL</TableCell>
                  <TableCell>STATUS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Loader === "a" ? (
                  Users.map((row) => (
                    <TableRow
                      onClick={() => getUserInfo(row._id)}
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row._id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.email}
                      </TableCell>
                      <TableCell>
                        {row.status === false ? "Pending" : "Active"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <ReactLoading
                        type="cylon"
                        color="#333333"
                        height={100}
                        width={50}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <ReactLoading
                        type="cylon"
                        color="#333333"
                        height={100}
                        width={50}
                      />
                    </TableCell>
                    <TableCell sx={{ marginLeft: "100px" }}>
                      <ReactLoading
                        type="cylon"
                        color="#333333"
                        height={100}
                        width={50}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Pagination
          count={
            parseInt(Pages / Limit) % 2 !== 0
              ? parseInt(Pages / Limit) + 1
              : parseInt(Pages / Limit)
          }
          size="small"
          sx={{ marginTop: "50px" }}
          onChange={handleChange}
        />
      </Box>
      <Tooltip
        onClick={() => navigate("/admin/add-user")}
        title="Add User"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <Add />
        </Fab>
      </Tooltip>

      <Modal
        open={Open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box width={400} height={280} bgcolor="white" p={3} borderRadius={5}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <Avatar></Avatar>
            <Typography varient="h6" color="gray" textAlign="center">
              User Information
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "10px",
            }}
          ></Box>
          <Box></Box>
          <TextField
            sx={{ marginRight: "7px", marginBottom: "20px" }}
            id="outlined-read-only-input"
            label="First Name"
            defaultValue={UserInfo.firstName}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="outlined-read-only-input"
            label="Last Name"
            defaultValue={UserInfo.lastName}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            sx={{ marginRight: "7px", marginBottom: "20px" }}
            id="outlined-read-only-input"
            label="Email"
            defaultValue={UserInfo.email}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="outlined-read-only-input"
            label="DOB"
            defaultValue={UserInfo.dateOfBirth}
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            sx={{ marginRight: "7px", marginBottom: "50px" }}
            id="outlined-read-only-input"
            label="Mobile"
            defaultValue={UserInfo.mobile}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="outlined-read-only-input"
            label="Status"
            defaultValue={UserInfo.status === false ? "Pending" : "Active"}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminHome;
