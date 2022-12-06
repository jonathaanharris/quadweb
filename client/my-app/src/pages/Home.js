/* eslint-disable jsx-a11y/alt-text */
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import './homepage.css';
import { useSearchParams } from 'react-router-dom';
import Navbar from "../components/Navbar"
import { fetchAll } from "../store/action/blog";
import Card from "../components/Card";
import Pagination from "../components/Pagination";

function Home(props) {
  // const dispatch = useDispatch()
  const { blogs } = useSelector((state) => state.blogReducer)
  // const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  let maxPage = 0

  if (blogs && blogs.count) {
    maxPage = Math.ceil(blogs.count / 6)
  }

  return (
    <div className="container-fluid">
      <Navbar setPage={props.setPage} />
      <div className="content">
        <div className="titlecontent">
          New Articles
        </div>
        <div className="row">
          <div className="artikelterbarupadding">
            <div className="row">
              {blogs.rows ? blogs.rows.map((movie, index) => <Card key={movie.id} data={movie}></Card>) : <div>loading</div>}
            </div>
          </div>
        </div>
        <Pagination paginationHandler={props.paginationHandler} page={props.page} maxPage={maxPage}></Pagination>
      </div>
    </div>

  );
}
export default Home;