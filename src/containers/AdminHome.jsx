import { Menu } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import axios from "axios";
import ReactLoading from "react-loading";
import {
  AppBar,
  Box,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import React, { useEffect, useState } from "react";

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
          count={Pages / Limit}
          size="small"
          sx={{ marginTop: "50px" }}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default AdminHome;
