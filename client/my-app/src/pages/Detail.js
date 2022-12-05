import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import './loginpage.css';
import { } from "react-router-dom";
import './detailpage.css'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from "../components/Navbar"


function Detail() {


  return (
    <div className="container-fluid">
      <Navbar />

      <div className="paddingsummary">
        <div className="bordersummary">
          <div className="judulartikelnew">Ide buntu? paksa dirimu untuk membuat design selama 30 menit</div>
          <div className="publishdate">16th March 2022</div>
          <div className="postedby">Posted by <span>Jonathan</span></div>
          <div className="viewsblog">
            <div class="count-container">
              <div class="count">304<span> views</span></div>
            </div>
          </div>
        </div>
        <div className="thumbnail">
          <div class="thumbnail_sizing">
            <img src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" alt="" />
          </div>
        </div>
        <div className="textblog">
          <div className="isiartikel">
            <div class="textartikel text-justify">
              "We hope the FIFA World Cup will be successful and full of opportunities and collaboration potentials between our two countries. We will prepare our creative economy products and promote them to the world," he added during his visit to Doha, Qatar, according to a statement issued on Saturday.
            </div>
          </div>
        </div>
        <div className="comment">
          <div class="judulhalaman">
            Comments
          </div>
          <div className="inputcomment">
            <div class="d-flex flex-row add-comment-section mt-4 mb-4"><input type="text" class="form-control mr-3" placeholder="Add comment" /><button class="btn btn-primary" type="button">Comment</button></div>
          </div>
          <div class="row blogtestimonial_right">
            <div className="col-lg-10 col-md-10 col-10">
              <div class="blogtestimonial_text">
                "Blog nya om  @dwinawan_ sangat mudah dipahami dan enak dibacanya"
              </div>
              <div class="blogtestimonial_user">@dadimdum</div>
            </div>
            <div className="col-lg-2 col-md-2 col-2 justify-content-end">
              <button type="button" class="btn-sm btn-danger">X</button>
            </div>
          </div>
          <div class="row blogtestimonial_right">
            <div className="col-lg-10 col-md-10 col-10">
              <div class="blogtestimonial_text">
                "Blog nya om  @dwinawan_ sangat mudah dipahami dan enak dibacanya, bahkan saya masih sering mampir buat pengingat atau referensi. Kudos om 🤝."
              </div>
              <div class="blogtestimonial_user">@dadimdum</div>
            </div>
            <div className="col-lg-2 col-md-2 col-2">
              <button type="button" class="btn-sm btn-danger">X</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}





export default Detail;