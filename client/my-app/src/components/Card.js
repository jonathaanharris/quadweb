import { Link } from 'react-router-dom'


export default function Card(props) {
  let isoDate = new Date(props.data.createdAt)
  return (
    <Link className="col-md-6 col-lg-4 col-sm-6 mx-auto" to={`/blog/${props.data.id}`}>
      <div className="blogcard">
        <div className="articlethumbnail d-flex align-items-center"><img className="" alt="" src={props.data.image} /></div>
        <div className="contentsmallartikel">
          <div className="blogdate">{isoDate.toDateString()}</div>
          <div className="sm_articletitle">{props.data.title}</div>
          <div className="sm_synopsis">{props.data.description.length > 50 ? props.data.description.slice(0, 50) + "..." : props.data.description}</div>
        </div>
      </div>
    </Link>
  )
}