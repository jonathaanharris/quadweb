import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import './loginpage.css';
import { } from "react-router-dom";
import './detailpage.css'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from "../components/Navbar"
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import { fetchById } from "../store/action/blog";
import { fetchCommentById } from "../store/action/comment";
import Comment from "../components/Comment";
import { addComment, deleteComment } from "../store/action/comment";
import swal from "sweetalert"

function Detail(props) {
  const { id } = useParams();
  const dispatch = useDispatch()
  let { blogDetail, err } = useSelector((state) => state.blogReducer)
  let { comments, errComment } = useSelector((state) => state.commentReducer)
  const [comment, setComment] = useState('')
  const navigate = useNavigate()

  let isoDate = blogDetail ? new Date(blogDetail.createdAt) : ""

  useEffect(() => {
    dispatch(fetchById(id))
    dispatch(fetchCommentById(id))
  }, [])

  const commentHandler = (e) => {
    setComment(e.target.value)
  }

  const submitHandler = (e) => {
    let payload = { text: comment }
    e.preventDefault();

    dispatch(addComment(id, payload))
      .then(data => {
        dispatch(fetchCommentById(id))
        swal('Add comment success')
        setComment("")
        navigate(`/blog/${id}`)
      })
      .catch(err => {
        swal(err.message)
      })
  }
  const deleteHandler = (e, idc) => {
    e.preventDefault();
    dispatch(deleteComment(idc))
      .then(data => {
        dispatch(fetchCommentById(id))
        swal('delete comment success')
        setComment("")
        navigate(`/blog/${id}`)
      })
      .catch(err => {
        swal(err.message)
      })
  }


  if (err) return <div>error:{err.message}</div>
  if (errComment) return <div>error:{errComment.message}</div>
  if (!blogDetail || !comments) return <div>loading</div>

  return (
    <div className="container-fluid">
      <Navbar />

      <div className="paddingsummary">
        <div className="bordersummary">
          <div className="judulartikelnew">{blogDetail.title}</div>
          <div className="publishdate">{isoDate ? isoDate.toDateString() : ""}</div>
          <div className="postedby">Posted by <span>{blogDetail.User.username}</span></div>
          <div className="viewsblog">
            <div className="count-container">
              <div className="count">{blogDetail.count}<span> views</span></div>
            </div>
          </div>
        </div>
        <div className="thumbnail">
          <div className="thumbnail_sizing">
            <img src={blogDetail.image} alt="" />
          </div>
        </div>
        <div className="textblog isiartikel">
          <div className="isiartikel">
            <div className="textartikel text-justify">
              {blogDetail.description}
            </div>
          </div>
        </div>
        <div className="comment">
          <div className="judulhalaman">
            Comments
          </div>
          <div className="inputcomment">
            <form className="d-flex flex-row add-comment-section mt-4 mb-4" onSubmit={submitHandler}>
              <input onChange={commentHandler} type="text" className="form-control mr-3" placeholder="Add comment" value={comment} />
              <button className="btn btn-primary" type="submit">Comment</button>
            </form>
          </div>
          {comments ? comments.map((comment, index) => <Comment key={comments.id} data={comment} authorId={comment.User.id} deleteHandler={deleteHandler}></Comment>) : <div>loading</div>}
        </div>
      </div>

    </div>
  );
}





export default Detail;