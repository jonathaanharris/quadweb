import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import './Navbar.css'
import swal from "sweetalert"

const Navbar = (props) => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  let token = localStorage.getItem('accessToken')

  let searchHandler = (e) => {
    setSearch(e.target.value)
  }

  let submitHandler = (e) => {
    e.preventDefault();
    props.setPage(1)
    navigate({ pathname: "/", search: `title=${search}` })
  }

  let homeHandler = (e) => {
    props.setPage(1)
    setSearch("")
  }

  const logoutHandler = () => {
    localStorage.clear()
    swal('Logout Successful')
    navigate('/login')
  }

  return (<div id="my-navbar" className="row">
    <div className="col-lg-9 col-md-9 col-9 ">
      <div className="menu row align-items-center">
        <Link onClick={homeHandler} to="/" >Home</Link>
        <Link to="/newblog" relative="path" >Add Blog</Link>
        <form className="search" onSubmit={submitHandler}>
          <input value={search} onChange={searchHandler} placeholder="Search..." className="search-bar" type="text" />
        </form>
      </div>
    </div>

    <div className="col-lg-3 col-md-3 col-3">
      <div className="menu row align-items-center justify-content-end">
        {token ? <Link onClick={logoutHandler} to="/login" >Log out</Link>
          : <Link to="/login" style={{ marginRight: "0px" }}>Log in</Link>}
      </div>
    </div>
  </div>)
}

export default Navbar