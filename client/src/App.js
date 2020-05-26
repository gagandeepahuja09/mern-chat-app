import React from 'react';

import 'antd';

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import Register from './components/Register/Register';
import Users from './components/Users/Users';

import { BrowserRouter, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Join} />
      <Route path="/users" exact component={Users} />
      <Route path="/chat" component={Chat} />
      <Route path="/register" component={Register} />
    </BrowserRouter>
  );
}

export default App;