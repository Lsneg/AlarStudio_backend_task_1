import React, { useEffect, useContext } from "react";
import { UserContext } from "../../context";
import Cookies from "js-cookie";
import Auth from "../Auth";
import Users from "../Users";
import { api } from "../../api";

function App() {
  const { user, dispatch } = useContext(UserContext);

  useEffect(() => {
    api.ApiUser.getOneUsers(parseInt(Cookies.get("id") || ""))
      .then((res: any) => {
        if (res.status === 200) {
          dispatch({
            type: "AUTH",
            isAuth: true,
            id: res.data.id,
            username: res.data.username
          });
        }
      })
      .catch((err: any) => {
        if (err.response.status === 401) {
          dispatch({ type: "AUTH", isAuth: false });
        }
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {!user.isAuth && <Auth />}
      {user.isAuth && <Users />}
    </div>
  );
}

export default App;
