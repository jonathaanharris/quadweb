import { useState } from "react";
import './loginpage.css';
import './formpage.css';
import Navbar from "../components/Navbar"
import { useDispatch, useSelector } from 'react-redux'
import { addBlog, fetchAll, updateBlog } from "../store/action/blog";
import swal from "sweetalert"
import { useNavigate } from "react-router-dom";


function FormBlog(props) {
  const { blogDetail } = useSelector((state) => state.blogReducer)
  const dispatch = useDispatch()
  const [title, setTitle] = useState(props.update && blogDetail ? blogDetail.title : '')
  const [imageUrl, setImageUrl] = useState(props.update && blogDetail ? blogDetail.image : '')
  const [description, setDescription] = useState(props.update && blogDetail ? blogDetail.description : '')
  const navigate = useNavigate()

  const titleHandler = (e) => {
    setTitle(e.target.value)
  }

  const descriptionHandler = (e) => {
    setDescription(e.target.value)
  }
  const imageUrlHandler = (e) => {
    setImageUrl(e.target.value)
  }

  const submitHandler = (e) => {
    let payload = { title, description }
    e.preventDefault();


    if (props.update) {
      dispatch(updateBlog(blogDetail.id, payload))
        .then(data => {
          dispatch(fetchAll())
          swal('update blog success')
          navigate(`/blog/${blogDetail.id}`)
        })
        .catch(err => {
          swal(err.message)
        })
    } else {
      dispatch(addBlog(payload))
        .then(data => {
          dispatch(fetchAll())
          swal('Add blog success')
          navigate(`/`)
        })
        .catch(err => {
          swal(err.message)
        })
    }


  }


  return (
    <div className="container-fluid">
      <Navbar />
      <div className="formblog">
        <div className="isiform">
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label>Title</label>
              <input onChange={titleHandler} type="description" className="form-control" id="exampleInputTitle" aria-describedby="" placeholder="Title..." value={title} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea onChange={descriptionHandler} type="description" className="form-control" id="exampleInputPassword1" placeholder="Description..." value={description}></textarea>
            </div>
            <div className="form-group">
              <label>image Url</label>
              <input onChange={imageUrlHandler} type="description" className="form-control" id="exampleInputTitle" aria-describedby="" placeholder="Title..." value={imageUrl} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}





export default FormBlog;