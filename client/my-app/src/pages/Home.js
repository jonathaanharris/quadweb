import { useSelector } from 'react-redux'
import './homepage.css';
import Navbar from "../components/Navbar"
import Card from "../components/Card";
import Pagination from "../components/Pagination";

function Home(props) {
  const { blogs } = useSelector((state) => state.blogReducer)
  let maxPage = 0

  if (blogs && blogs.count) {
    maxPage = Math.ceil(blogs.count / 6)
  }

  return (
    <div className="container-fluid">
      <Navbar setPage={props.setPage} />
      <div className="content">
        {props.page === 1 ? <div className="titlecontent">
          New Articles
        </div> : <div className="titlecontent">
          Articles
        </div>}
        <div className="row">
          <div className="row">
            {blogs.rows ? blogs.rows.map((movie, index) => <Card key={movie.id} data={movie}></Card>) : <div>loading</div>}
          </div>
        </div>
        <Pagination paginationHandler={props.paginationHandler} page={props.page} maxPage={maxPage}></Pagination>
      </div>
    </div>

  );
}
export default Home;