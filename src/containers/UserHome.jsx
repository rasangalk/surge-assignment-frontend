import { Add } from "@mui/icons-material";
import ReactLoading from "react-loading";
import {
  AppBar,
  Avatar,
  Box,
  Fab,
  Grid,
  IconButton,
  InputBase,
  Modal,
  Pagination,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserHome = () => {
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

  // Success toast message
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

  // Stores all the notes
  const [Notes, setNotes] = useState([]);

  // Stores modal open and close status
  const [CreateModalOpen, setCreateModalOpen] = useState(false);

  // Stores note title
  const [Title, setTitle] = useState("");

  // Stores note description
  const [Description, setDescription] = useState("");

  // Stores number of pages
  const [Pages, setPages] = useState();

  // Stores note limit in a page
  const [Limit, setLimit] = useState(6);

  // Stores loading indicator state
  const [Loader, setLoader] = useState("");

  // Store current page number
  const [PageNumber, setPageNumber] = useState();

  // Stores user id
  const { id } = useParams();

  // Handles note creation
  const handleCreateNote = () => {
    if (Title === "" || Description === "") {
      ErrMsg("Please fill the required fields!");
    } else {
      axios
        .post("http://localhost:2000/api/note", {
          userId: id,
          title: Title,
          description: Description,
        })
        .then(function (response) {
          console.log(response);
          setCreateModalOpen(false);
          Success("Note created!");
        })
        .catch(function (error) {
          console.log(error);
          ErrMsg("Internal server error!");
        });
    }
  };

  // Handles pagination
  const handleChange = (event, value) => {
    setPageNumber(value);
    axios
      .get(`http://localhost:2000/api/note/${id}?page=${PageNumber}`)
      .then(function (response) {
        console.log(response);
        setPages(parseInt(response.data.total));
        setLimit(parseInt(response.data.limit));
        setNotes(response.data.notes);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:2000/api/note/${id}?page=${PageNumber}`)
      .then(function (response) {
        console.log(response.data.notes);
        setNotes(response.data.notes);
        setPages(parseInt(response.data.total));
        setLimit(parseInt(response.data.limit));
        setLoader("a");
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [PageNumber]);

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
            // onClick={() => setMenu(true)}
          >
            <Avatar />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            My Notes
          </Typography>
        </Toolbar>
      </AppBar>
      <ToastContainer />
      <Box sx={{ marginLeft: "30px", marginRight: "30px", marginTop: "90px" }}>
        <Grid container spacing={2}>
          {Loader === "a" ? (
            Notes.map((note) => (
              <Grid item xs={6} md={4} key={note._id}>
                <Box>
                  <CardContent
                    sx={{ backgroundColor: "#f7de6f", boxShadow: 11 }}
                  >
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ marginBottom: "10px" }}
                    >
                      {note.title}
                    </Typography>
                    <Typography variant="body2">
                      {note.description}
                      <br />
                    </Typography>
                  </CardContent>
                </Box>
              </Grid>
            ))
          ) : (
            <>
              <Grid item xs={6} md={4}>
                <Box>
                  <CardContent
                    sx={{ backgroundColor: "#f7de6f", boxShadow: 11 }}
                  >
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ marginBottom: "10px" }}
                    >
                      <ReactLoading
                        type="cylon"
                        color="#333333"
                        height={100}
                        width={100}
                      />
                    </Typography>
                    <Typography variant="body2">
                      <ReactLoading
                        type="cylon"
                        color="#333333"
                        height={20}
                        width={50}
                      />
                      <br />
                    </Typography>
                  </CardContent>
                </Box>
              </Grid>
              <Grid item xs={6} md={4}>
                <Box>
                  <CardContent
                    sx={{ backgroundColor: "#f7de6f", boxShadow: 11 }}
                  >
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ marginBottom: "10px" }}
                    >
                      <ReactLoading
                        type="cylon"
                        color="#333333"
                        height={100}
                        width={100}
                      />
                    </Typography>
                    <Typography variant="body2">
                      <ReactLoading
                        type="cylon"
                        color="#333333"
                        height={20}
                        width={50}
                      />
                      <br />
                    </Typography>
                  </CardContent>
                </Box>
              </Grid>
              <Grid item xs={6} md={4}>
                <Box>
                  <CardContent
                    sx={{ backgroundColor: "#f7de6f", boxShadow: 11 }}
                  >
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ marginBottom: "10px" }}
                    >
                      <ReactLoading
                        type="cylon"
                        color="#333333"
                        height={100}
                        width={100}
                      />
                    </Typography>
                    <Typography variant="body2">
                      <ReactLoading
                        type="cylon"
                        color="#333333"
                        height={20}
                        width={50}
                      />
                      <br />
                    </Typography>
                  </CardContent>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
      >
        <Pagination
          size="small"
          count={
            parseInt(Pages / Limit) % 6 !== 0
              ? parseInt(Pages / Limit)
              : parseInt(Pages / Limit) + 1
          }
          onChange={handleChange}
        />
      </Box>
      <Modal
        open={CreateModalOpen}
        onClose={(e) => setCreateModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box width={400} height={400} bgcolor="white" p={3} borderRadius={5}>
          <Typography varient="h6" color="gray" textAlign="center">
            New note
          </Typography>

          <Box
            sx={{
              display: "flex",

              alignItems: "center",

              gap: "10px",

              marginBottom: "20px",
            }}
          ></Box>

          <TextField
            fullWidth
            required
            label="Title"
            type="text"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
            sx={{ marginBottom: "15px", marginTop: "5px" }}
          />

          <TextField
            required
            sx={{ width: "100%", marginBottom: "3rem" }}
            id="standard-multiline-static"
            multiline
            rows={8}
            placeholder="Description *"
            variant="standard"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button fullWidth variant="contained" onClick={handleCreateNote}>
            Create
          </Button>
        </Box>
      </Modal>
      <Tooltip
        onClick={() => setCreateModalOpen(true)}
        title="Add Note"
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
    </Box>
  );
};

export default UserHome;
