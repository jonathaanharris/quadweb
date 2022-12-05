import React from "react"
import { Link } from "react-router-dom"
import './Navbar.css'

const Navbar = () => {
  return (<div id="my-navbar" className="row">
    <div className="col-lg-9 col-md-9 col-9 ">
      <div className="menu row align-items-center">
        <Link to="/" href="learn.html" className="a_menudesktop">Home</Link>
        <Link to="/" href="blog.html" class="a_menudesktop">Blog</Link>
        <Link to="/newblog" relative="path" class="a_menudesktop">Add Blog</Link>
        <div className="search">
          <input placeholder="Search..." className="search-bar" type="text" />
        </div>
      </div>
    </div>

    <div className="col-lg-3 col-md-3 col-3">
      <div className="menu row align-items-center justify-content-end">
        <Link href="learn.html" className="a_menudesktop">Log out</Link>
        <Link to="/login" href="blog.html" class="a_menudesktop" style={{ marginRight: "0px" }}>Log in</Link>
      </div>
    </div>
  </div>)
}

export default Navbar