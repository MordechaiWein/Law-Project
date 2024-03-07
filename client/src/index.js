import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from "./components/App";
import { BrowserRouter as Router } from 'react-router-dom';
import { MyProvider } from "./components/AppContext";

ReactDOM.render(
  <Router>
    <MyProvider>
      <App />
    </MyProvider>
  </Router>,
  document.getElementById('root')
);