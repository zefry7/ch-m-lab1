import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import "./styles/style.css"
import { Main } from "./content/import_file"
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

const url = window.location.pathname.split("/")

if (url.length <= 2) {
  window.location.href += "/"
  console.log(123)
}

const init = {
  a: "",
  b: "",
  eps: "",
  title: "",
  result: {}
}

const reducer = (state = init, action) => {
  switch (action.type) {
    case "set_a":
      return { ...state, a: action.a }
    case "set_b":
      return { ...state, b: action.b }
    case "set_eps":
      return { ...state, eps: action.eps }
    case "set_title":
      return { ...state, title: action.title }
    case "set_result":
      return { ...state, result: {...action.result} }
    default:
      return state
  }
}

const store = createStore(reducer)

root.render(
  <Provider store={store}>
    <BrowserRouter basename={`${url[1]}/`}>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter >
  </Provider>
);


