/* eslint-disable jsx-a11y/alt-text */
// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import './homepage.css';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar"
import { fetchAll } from "../store/action/blog";
import Card from "../components/Card";

function Home() {
  const dispatch = useDispatch()
  const { blogs } = useSelector((state) => state.blogReducer)
  console.log(blogs)
  useEffect(() => {
    dispatch(fetchAll())
  }, [dispatch])

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="content">
        <div className="row">
          <div className="artikelterbarupadding">
            <div className="row">
              {blogs.rows ? blogs.rows.map((movie, index) => <Card key={movie.id} data={movie}></Card>) : <div>loading</div>}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
export default Home;