import React from 'react';
import ReactDOM from 'react-dom/client';
import "./style/main.scss";
import App from './App.js'

import reportWebVitals from './reportWebVitals';
if(!localStorage.notes) localStorage.setItem('notes', JSON.stringify(''))
if(!localStorage.toDo) localStorage.setItem('toDo', JSON.stringify(['']))
if(!localStorage.clock) localStorage.setItem('clock', JSON.stringify(['']))
if(!localStorage.bgc) localStorage.setItem('bgc', JSON.stringify('#ffffff'))
if(!localStorage.canvas) localStorage.setItem('canvas', JSON.stringify(''))
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App/>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();