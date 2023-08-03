import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import SignIn from "../assets/signup.jpg";

const cookies = new Cookies();
const initialState = {
  fullname: "",
  username: "",
  password: "",
  confirmPassword: "",
  avatarURL: "",
  phoneNumber: "",
  email: "",
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    const { username, password, email, avatarURL, fullname, phone } = form;
    const URL = "http://localhost:5000/auth";
    const {
      data: { token, userId, hashedPassward },
    } = axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {
      username,
      password,
      email,
      avatarURL,
      fullname,
      phone,
    });
    cookies.set("token", token);
    cookies.set("fullname", fullname);
    cookies.set("username", username);
    cookies.set("userId", userId);
    if (isSignup) {
      cookies.set("avatarURL", avatarURL);
      cookies.set("phoneNumber", phone);
      cookies.set("hashedPassward", hashedPassward);
    }
    window.location.reload();
  };

  //     .then((res) => {
  //       console.log(res);
  //       const cookies = new Cookies();
  //       cookies.set("token", res.data.token, { path: "/" });
  //       cookies.set("user", res.data.user, { path: "/" });
  //       window.location.href = "/";
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignup ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="username">Full name</label>
                <input
                  name="fullname"
                  type="text"
                  onChange={handleChange}
                  placeholder="Fullname"
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="username">Username</label>
                <input
                  name="username"
                  type="text"
                  onChange={handleChange}
                  placeholder="Username"
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="Phone number">Phone number</label>
                <input
                  name="phoneNumber"
                  type="Number"
                  placeholder="Phone number"
                  required
                  onChange={handleChange}
                />
              </div>
            )}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  name="avatarURL"
                  type="text"
                  placeholder="Avatar URL"
                  required
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="auth__form-container_fields-content_input">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                onChange={handleChange}
              />
            </div>
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                onChange={handleChange}
              />
            </div>

            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="password">Confirm Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="auth__form-container_fields-content_button">
              <button>{isSignup ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>

          <div className="auth__form-container_fields-account">
            <p>
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <span onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={SignIn} alt="sign in" />
      </div>
    </div>
  );
};

export default Auth;
