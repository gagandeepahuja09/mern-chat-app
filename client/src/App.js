import React from 'react';

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import Register from './components/Register/Register';

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
      <Route path="/register" component={Register} />
    </Router>
  );
}

export default App;