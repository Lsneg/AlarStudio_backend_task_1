import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Table from "../Table";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Cookies from "js-cookie";
import { api } from "../../api";
import "./style.css";

function Users() {
  const { user, dispatch } = useContext(UserContext);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };

  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(0);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("USER");

  const setEditId = (id: number) => setId(id);
  const unsetEditId = () => setId(0);

  const handleUsername = (ev: any) => setUsername(ev.target.value);
  const unsetUsername = () => setUsername("");

  const handlePassword = (ev: any) => setPassword(ev.target.value);

  const handleRoleChange = (ev: any) => {
    setRole(ev.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    unsetUsername();
    unsetEditId();
  };

  const logOut = () => {
    Cookies.remove("id");
    Cookies.remove("token");
    dispatch({ type: "AUTH", isAuth: false });
  };

  const newUser = () => {
    handleOpen();
  };

  const getUser = () => {
    api.ApiUser.getUsers().then((res: any) => {
      if (res.status === 200) {
        dispatch({
          type: "AUTH",
          usersList: res.data
        });
      }
    });
  };

  const editUser = (id: number, username: string) => {
    handleOpen();
    setEditId(id);
    setUsername(username);
  };

  const deleteUser = (id: number) => {
    api.ApiUser.deleteUsers(id).then((res: any) => {
      if (res.status === 204) {
        getUser();
      }
    });
  };

  const save = () => {
    if (id === 0) {
      api.ApiUser.postCreateUser(username, password, role).then(res => {
        if (res.status === 201) {
          getUser();
        }
      });
    } else {
      api.ApiUser.patchEditUser(id, username, password, role).then(res => {
        if (res.status === 304 || res.status === 204) {
          getUser();
        }
      });
    }

    handleClose();
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="wrap">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <TextField
              id="outlined-basic"
              label="username"
              variant="outlined"
              value={username}
              onChange={handleUsername}
            />
            <div>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Role"
                onChange={handleRoleChange}
              >
                <MenuItem value="USER">USER</MenuItem>
                <MenuItem value="ADMIN">ADMIN</MenuItem>
              </Select>
            </div>

            <TextField
              id="outlined-basic"
              label="password"
              variant="outlined"
              type="password"
              onChange={handlePassword}
            />
          </div>
          <br />
          <div>
            <Button variant="outlined" onClick={save}>
              Save
            </Button>
          </div>
        </Box>
      </Modal>
      <div className="users">
        <div>Username: {user.username}</div>
        <div className="logout">
          <Button variant="contained" onClick={newUser}>
            Add user
          </Button>

          <Button variant="contained" onClick={logOut}>
            Logout
          </Button>
        </div>
      </div>
      <div>
        <Table
          deleteUser={deleteUser}
          editUser={editUser}
          usersList={user.usersList}
        />
      </div>
    </div>
  );
}

export default Users;
