import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import './App.css';
import Detail from "./pages/Detail";
import FormBlog from "./pages/FormBlog";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/blog/:id" element={<Detail />} />
      <Route path="/newblog" element={<FormBlog />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
