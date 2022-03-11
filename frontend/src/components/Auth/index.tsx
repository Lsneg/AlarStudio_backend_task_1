import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { UserContext } from "../../context";
import Cookies from "js-cookie";
import { api } from "../../api";

import "./style.css";

function Auth() {
  const [Auth, setAuth] = useState({
    login: "",
    password: ""
  });

  const login = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setAuth({
      ...Auth,
      login: ev.target.value
    });
  };

  const password = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setAuth({
      ...Auth,
      password: ev.target.value
    });
  };

  const submit = () => {
    api.ApiAuth.postAuth({
      username: Auth.login,
      password: Auth.password
    }).then(res => {
      if (res.status === 200) {
        const token = res.data.token;
        const id = res.data.id;

        Cookies.set("id", String(id));
        Cookies.set("token", token);

        window.location.reload();
      }
    });
  };

  return (
    <div className="auth">
      <div>
        <TextField
          id="outlined-required"
          label="Login"
          defaultValue=""
          onChange={login}
        />
        <TextField
          onChange={password}
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
        <Button variant="contained" onClick={submit}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Auth;
