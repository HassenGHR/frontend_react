import React from "react";
import { createRoot } from 'react-dom/client';// Import ReactDOM from 'react-dom'

import "./index.css";
import App from "./App";
const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(<App />); // Use ReactDOM.render() instead of ReactDOM.createRoot()
