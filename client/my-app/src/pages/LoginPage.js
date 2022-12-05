import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './loginpage.css';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"
import { LoginHandler } from "../store/action/user";
import swal from "sweetalert"

function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const emailHandler = (e) => {
    setEmail(e.target.value)
  }
  const passwordHandler = (e) => {
    setPassword(e.target.value)
  }
  const submitHandler = (e) => {
    let payload = { email, password }
    console.log(payload)
    e.preventDefault();
    dispatch(LoginHandler(payload))
      .then(() => {
        if (localStorage.getItem('accessToken')) {
          swal('Login Successful')
          navigate('/')
        }
      })
  }

  return (
    <div className="container">
      <div className="dark row justify-content-center">
        <div className="login-wrap p-0">
          <h3 className="mb-4 text-center">Have an account?</h3>
          <form action="#" className="signin-form" onSubmit={submitHandler}>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Email" required onChange={emailHandler} />
            </div>
            <div className="form-group">
              <input id="password-field" type="password" className="form-control" placeholder="Password" required onChange={passwordHandler} />
              <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
            </div>
            <div className="form-group">
              <button type="submit" className="form-control btn btn-primary submit px-3">Sign In</button>
            </div>
            <div className="form-group">
              <button className="btn btn-lg btn-google btn-block text-uppercase btn-outline"><img className="mr-2" alt="" src="https://img.icons8.com/color/16/000000/google-logo.png" />Sign in with Google</button>
            </div>
          </form>
          <Link className="text-white w-100 text-center" to="/register" relative="path">
            — Or Register Here —
          </Link>

        </div>
      </div>
    </div>
  );
}





export default LoginPage;