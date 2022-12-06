import { Link } from 'react-router-dom'


export default function Card(props) {
  let isoDate = new Date(props.data.createdAt)
  return (
    <Link className="col-md-6 col-lg-4 col-sm-6" to={`/blog/${props.data.id}`}>
      <div className="blogcard">
        <div className="thumbnailartikel d-flex align-items-center"><img className="" alt="" src={props.data.image} /></div>
        <div className="contentsmallartikel">
          <div className="blogdate">{isoDate.toDateString()}</div>
          <div className="small_judulartikel">{props.data.title}</div>
          <div className="small_synopsis">{props.data.description}</div>
        </div>
      </div>
    </Link>
  )
}