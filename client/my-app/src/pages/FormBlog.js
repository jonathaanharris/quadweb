import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './loginpage.css';
import { Link } from "react-router-dom";
import './formpage.css';
import Navbar from "../components/Navbar"

function FormBlog() {


  return (
    <div className="container-fluid">
      <Navbar />
      <div className="formblog">
        <div className="isiform">
          <form>
            <div class="form-group">
              <label>Title</label>
              <input type="text" class="form-control" id="exampleInputTitle" aria-describedby="" placeholder="Title..." />
              {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea type="text" class="form-control" id="exampleInputPassword1" placeholder="Description..."></textarea>
            </div>
            <div className="row mb-3">
              <div className="col-lg-5 col-md-5 col-5">
                <label>Choose Image</label>
                <div class="custom-file">
                  <input type="file" class="custom-file-input" id="validatedCustomFile" required />
                  <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                  <div class="invalid-feedback">Example invalid custom file feedback</div>
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}





export default FormBlog;