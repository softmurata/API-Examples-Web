import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ChatRoom from "./pages/ChatRoom";
import Preview from "./pages/Preview";

import Three from "./Three"

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/chatroom/:roomId/:channel/:username"
            component={ChatRoom} />
          <Route exact path="/preview" component={Preview} />
        </Switch>
      </BrowserRouter>
      <Three />
    </>
  );
}

export default App;
