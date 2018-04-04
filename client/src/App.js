import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => (
  <Router>
    <div>
      <Navbar />
      <Wrapper>
        <Route exact path="/" component={Home} />
        <Route exact path="/saved" componenet={Saved} />
      </Wrapper>
      <Footer />
    </div>
  </Router>
);

export default App;
