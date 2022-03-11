import React, { createContext, useReducer } from "react";
import { reducer } from "./reducer";

export const UserContext = createContext<any>({
  isAuth: false,
  id: null,
  username: ""
});

interface AuxProps {
  children: React.ReactChild | React.ReactChildren;
}

const UserProvider = ({ children }: AuxProps) => {
  const [user, dispatch] = useReducer(reducer, {
    id: null,
    username: "",
    isAuth: false,
    dataList: []
  });

  return (
    <div>
      <UserContext.Provider value={{ user, dispatch }}>
        {children}
      </UserContext.Provider>
    </div>
  );
};

export default UserProvider;
