import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {ProvedorDatos} from "./Provider/ProvedorDatos";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>

    <ProvedorDatos>
      <App />
    </ProvedorDatos>

    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

