import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import './App.css';
import Detail from "./pages/Detail";
import FormBlog from "./pages/FormBlog";
import { useEffect, useState } from "react";
// import { fetchAll } from "../store/action/blog";
import { fetchAll } from "./store/action/blog";
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom';

function App() {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const paginationHandler = (e, i) => {
    e.preventDefault();
    setPage(page + i)
  }

  let obj = { page }
  let search = searchParams.get("title")

  if (search) {
    obj.title = search
  }

  useEffect(() => {
    dispatch(fetchAll(obj))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, search, page])

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Home paginationHandler={paginationHandler} page={page} setPage={setPage} />} />
      <Route path="/blog/:id" element={<Detail />} />
      <Route path="/newblog" element={<FormBlog setPage={setPage} />} />
      <Route path="/updateblog" element={<FormBlog update={true} />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
