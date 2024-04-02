// Import only what's necessary from 'react-router-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Dashboard from "./Dashboard"; // Assuming this is your dashboard component

// Correctly set up your application with a single instance of BrowserRouter
const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
