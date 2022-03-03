import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Config from "../config";
import { useDispatch, useSelector } from "react-redux";
import { crruentUser, userToken } from "../Store/users/usersActions";
import { setPosts } from "../Store/posts/postsActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  let [user, setUser] = useState({});
  let currentUser = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleOnChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (user.password.length < 6) {
      toast.warning("password must be 6 characters or more");
      return false;
    }

    axios
      .post(`${Config.API}users/login`, { ...user })
      .then((res) => {
        toast.info(res.data.msg);
        console.log(res);
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Somethin went wrong");
      });
  };

  return (
    <div>
      <div className="container ">
        <h3 className="text-muted fw-bold m-5">Login</h3>
        <form className=" w-50 m-auto mt-5" onSubmit={handleOnSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              required
              name="email"
              onChange={handleOnChange}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
              name="password"
              onChange={handleOnChange}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="my-3  text-center">
            <input
              type="submit"
              className="btn btn-outline-success  w-50"
              value="Login"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
