import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./context";
import IndexPage from "./components/IndexPage";

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <IndexPage />
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
