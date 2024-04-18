import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import "./styles/style.css"
import { Main } from "./content/import_file"

const root = ReactDOM.createRoot(document.getElementById('root'));

const url = window.location.pathname.split("/")

if(url.length <= 2) {
  window.location.href += "/"
  console.log(123)
}

root.render(
  <React.StrictMode>
    <BrowserRouter basename={`${url[1]}/`}>
      <Routes>
        <Route path="/" element={<Main />} />         
      </Routes>
    </BrowserRouter >
  </React.StrictMode>
);


