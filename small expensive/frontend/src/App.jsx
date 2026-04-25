import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GroupPage from "./pages/GroupPage";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/group/:id" element={<GroupPage />} />
      </Routes>
    </BrowserRouter>
  );
}