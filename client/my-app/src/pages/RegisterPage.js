import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './loginpage.css';
import { Link } from "react-router-dom";
import './registerpage.css';

function RegisterPage() {


  return (
    <div className="container">
      <div className="dark row justify-content-center">
        <div className="login-wrap p-0">
          <h3 className="mb-4 text-center">Register your account</h3>
          <form action="#" class="signin-form">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Username" required="" />
            </div>
            <div class="form-group">
              <input type="email" class="form-control" placeholder="Email" required="" />
            </div>
            <div class="form-group">
              <input id="password-field" type="password" class="form-control" placeholder="Password" required="" />
              <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span>
            </div>
            <div class="form-group">
              <button type="submit" class="form-control btn btn-primary submit px-3">Register</button>
            </div>
          </form>
          <p class="w-100 text-center">Already have an account?</p>
          <Link className="text-white w-100 text-center" to="/login" relative="path">
            — Login here —
          </Link>
          {/* <div class="social d-flex text-center">
	          	<a href="#" class="px-2 py-2 mr-md-1 rounded"><span class="ion-logo-facebook mr-2"></span> Facebook</a>
	          	<a href="#" class="px-2 py-2 ml-md-1 rounded"><span class="ion-logo-twitter mr-2"></span> Twitter</a>
	          </div> */}
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;