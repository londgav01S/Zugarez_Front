import logo from '../logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import {ApiProvider} from "../Context/ApiContext";
import {AppUI} from "./AppUI";



function App() {


  return (
      <Router>
        <ApiProvider>
            <AppUI />
        </ApiProvider>
      </Router>
  );
}

export default App;
