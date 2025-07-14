import React from 'react';
import { Routes, Route } from "react-router-dom";
import Categories from "./components/Categories";
import AvatarSelection from "./components/AvatarSelection";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Categories />} />
      <Route path="/avatars" element={<AvatarSelection />} />
    </Routes>
  );
}
export default App; 