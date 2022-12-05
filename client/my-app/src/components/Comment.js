import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import jwt from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { deleteComment } from "../store/action/comment";

export default function Comment(props) {

  let user = localStorage.getItem('accessToken') ? jwt(localStorage.getItem('accessToken')) : ""
  return (
    <div class="row blogtestimonial_right">
      <div className="col-lg-10 col-md-10 col-10">
        <div class="blogtestimonial_text">
          {props.data.text}
        </div>
        <div class="blogtestimonial_user">@{props.data.User.username}</div>
      </div>
      <div className="col-lg-2 col-md-2 col-2 justify-content-end">
        {user && user.id === props.authorId ? <button onClick={(e) => { props.deleteHandler(e, props.data.id) }} type="button" class="btn-sm btn-danger">X</button> : ""}
      </div>
    </div>
  )
}