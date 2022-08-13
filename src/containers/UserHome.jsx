import { Add } from "@mui/icons-material";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactLoading from "react-loading";
import {
  AppBar,
  Avatar,
  Box,
  Fab,
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Modal,
  Pagination,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
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

  const navigate = useNavigate();

  // Stores all the notes
  const [Notes, setNotes] = useState([]);

  // Stores note creation modal open and close status
  const [CreateModalOpen, setCreateModalOpen] = useState(false);

  // Stores note view modal open and close status
  const [ViewModelOpen, setViewModelOpen] = useState(false);

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

  // Stores selected note id
  const [CuurentId, setCuurentId] = useState("");

  // Stores selected nore title
  const [CurrentTitle, setCurrentTitle] = useState("");

  // Stores selected note description
  const [CurrentDescription, setCurrentDescription] = useState("");

  // Stores page reloading status
  const [Reload, setReload] = useState(false);

  // Stores user menu open and close status
  const [menu, setmenu] = useState(false);

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
          setCreateModalOpen(false);
          Success("Note created!");
        })
        .catch(function (error) {
          console.error(error);
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
        setPages(parseInt(response.data.total));
        setLimit(parseInt(response.data.limit));
        setNotes(response.data.notes);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // Handle card view
  const handleCardClick = (e) => {
    axios
      .get(`http://localhost:2000/api/select-note/${e}`)
      .then(function (response) {
        setCurrentTitle(response.data.details.title);
        setCurrentDescription(response.data.details.description);
        setCuurentId(response.data.details._id);
        setViewModelOpen(true);
        setReload(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:2000/api/note/${id}?page=${PageNumber}`)
      .then(function (response) {
        setNotes(response.data.notes);
        setPages(parseInt(response.data.total));
        setLimit(parseInt(response.data.limit));
        setLoader("a");
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [PageNumber, Reload]);

  // Handles updating a note
  const handleUpdate = () => {
    if (CurrentTitle === "" || CurrentDescription === "") {
      ErrMsg("Please fill required fields!");
    } else {
      axios
        .patch(`http://localhost:2000/api/note/${CuurentId}`, {
          title: CurrentTitle,
          description: CurrentDescription,
        })
        .then(function (response) {
          Success("updated!");
          setViewModelOpen(false);
          setReload(true);
        })
        .catch(function (error) {
          ErrMsg("Internal server error!");
        });
    }
  };

  // Handles deleting a note
  const handleDelete = () => {
    setViewModelOpen(false);
    confirmAlert({
      message: "Are you sure to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(`http://localhost:2000/api/note/${CuurentId}`)
              .then(function (response) {
                Success("Deleted!");
                setViewModelOpen(false);
                setReload(true);
              })
              .catch(function (error) {
                ErrMsg("Internal server error!");
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  // Handles to logout user
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload(false);
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
            onClick={() => setmenu(true)}
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
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={menu}
        onClose={(e) => setmenu(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <ToastContainer />
      <Box sx={{ marginLeft: "30px", marginRight: "30px", marginTop: "90px" }}>
        <Grid container spacing={2}>
          {Loader === "a" ? (
            Notes.map((note) => (
              <Grid item xs={6} md={4} key={note._id}>
                <Box>
                  <CardContent
                    onClick={() => handleCardClick(note._id)}
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
      <Modal
        open={ViewModelOpen}
        onClose={(e) => setViewModelOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box width={400} height={450} bgcolor="white" p={3} borderRadius={5}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <Typography varient="h6" color="gray" textAlign="center">
              My Note
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
            fullWidth
            required
            label="Title"
            defaultValue={CurrentTitle}
            type="text"
            variant="outlined"
            onChange={(e) => setCurrentTitle(e.target.value)}
            sx={{ marginBottom: "15px", marginTop: "5px" }}
          />
          <TextField
            required
            sx={{ width: "100%", marginBottom: "3rem" }}
            id="standard-multiline-static"
            multiline
            rows={8}
            defaultValue={CurrentDescription}
            placeholder="Description *"
            variant="standard"
            onChange={(e) => setCurrentDescription(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ marginBottom: "10px" }}
            onClick={handleUpdate}
          >
            Update
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Delete
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
