import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './loginpage.css';
import { Link } from "react-router-dom";
import './registerpage.css';
import { useDispatch } from "react-redux"
import { registerHandler } from "../store/action/user";
import swal from "sweetalert";

function RegisterPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const emailHandler = (e) => {
    setEmail(e.target.value)
  }

  const usernameHandler = (e) => {
    setUsername(e.target.value)
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value)
  }
  const submitHandler = (e) => {
    let payload = { email, password, username }
    e.preventDefault();
    dispatch(registerHandler(payload))
      .then(() => {
        swal('Register Successful')
        navigate('/login')
      })
      .catch(err => {
        swal(err.message)
      })
  }


  return (
    <div className="container">
      <div className="dark row justify-content-center">
        <div className="login-wrap p-0">
          <h3 className="mb-4 text-center">Register your account</h3>
          <form action="#" className="signin-form" onSubmit={submitHandler}>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Username" required="" onChange={usernameHandler} />
            </div>
            <div className="form-group">
              <input type="email" onChange={emailHandler} className="form-control" placeholder="Email" required="" />
            </div>
            <div className="form-group">
              <input id="password-field" type="password" className="form-control" placeholder="Password" required="" onChange={passwordHandler} />
              <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
            </div>
            <div className="form-group">
              <button type="submit" className="form-control btn btn-primary submit px-3">Register</button>
            </div>
          </form>
          <p className="w-100 text-center">Already have an account?</p>
          <Link className="text-white w-100 text-center" to="/login" relative="path">
            — Login here —
          </Link>
          {/* <div className="social d-flex text-center">
	          	<a href="#" className="px-2 py-2 mr-md-1 rounded"><span className="ion-logo-facebook mr-2"></span> Facebook</a>
	          	<a href="#" className="px-2 py-2 ml-md-1 rounded"><span className="ion-logo-twitter mr-2"></span> Twitter</a>
	          </div> */}
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;