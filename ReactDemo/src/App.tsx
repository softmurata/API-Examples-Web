import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ChatRoom from "./pages/ChatRoom";
import Preview from "./pages/Preview";
import ChatRoomWithCustomVideo from "./pages/ChatRoomWithCustomVideo";  // with mediapipe holistic

// import Three from "./Three"
import MediaPipe from "./MediaPipe";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/chatroom/:roomId/:channel/:username"
            component={ChatRoomWithCustomVideo} />
          <Route exact path="/preview" component={Preview} />
        </Switch>
      </BrowserRouter>
      <MediaPipe />
      {/*<Three />*/}
    </>
  );
}

export default App;
