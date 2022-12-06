import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import './Navbar.css'

const Pagination = (props) => {
  return (<nav aria-label="..." className="align-items-center justify-content-center d-flex">
    <ul className="pagination">
      <li className={`page-item ${props.page === 1 ? "disabled" : ""}`}>
        <button onClick={(e) => { props.paginationHandler(e, -1) }} className="page-link"
        >Previous</button>
      </li>
      <li className="page-item active" aria-current="page">
        <button onClick={(e) => { props.paginationHandler(e, 0) }} className="page-link">{props.page}</button>
      </li>
      <li className={`page-item ${props.page === props.maxPage ? "disabled" : ""}`}>
        <button onClick={(e) => { props.paginationHandler(e, 1) }} className="page-link" disabled={false}>Next</button>
      </li>
    </ul>
  </nav>)
}

export default Pagination