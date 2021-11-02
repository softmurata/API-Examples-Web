import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ChatRoom from "./pages/ChatRoom";
import Preview from "./pages/Preview";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/chatroom/:roomId" component={ChatRoom}/>
                <Route exact path="/preview" component={Preview}/>
                
            </Switch>
        </BrowserRouter>
    )
}

export default App