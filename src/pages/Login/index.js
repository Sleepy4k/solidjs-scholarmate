import styles from "./styles";
import * as React from "react";
import env from 'react-dotenv';
import GuestLayout from "../../layouts/GuestLayout";
import { Link, useNavigate } from "react-router-dom";
import { Api, Println, setLocalStorage } from "../../utils";

const Login = () => {
  const navigate = useNavigate();
  const [pressed, setPressed] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const onValidate = () => {
    let error = false;
    setPressed(true);

    if (!data.email) {
      Println("Login", "Email is required!", "warning");
      error = true;
    } else if (!data.password) {
      Println("Login", "Password is required!", "warning");
      error = true;
    }

    if (!error) {
      onSubmit();
    } else {
      setPressed(false);
    }
  }

  const onSubmit = () => {
    Api.post("auth/login", data)
      .then((response) => {
        const value = response.data;

        if (value.status === "success") {
          setLocalStorage("user", value.data);
          navigate("/");
        } else if (value.status === "error") {
          Println("Login", value.message, "error");
        } else {
          Println("Login", "Something went wrong!", "error");
        }
      })
      .catch((error) => {
        Println("Login", error.message, "error");
      })
      .finally(() => {
        setPressed(false);
      });
  };

  return (
    <GuestLayout>
      <div className="container-fluid">
        <div className="row h-100 align-items-center justify-content-center" style={styles.box}>
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <Link to="/">
                  <h3 className="text-primary"><i className="fa fa-user-edit me-2"></i>{env.APP_NAME}</h3>
                </Link>
                <h3>Sign In</h3>
              </div>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" name="email" placeholder="name@example.com" defaultValue={data.email} disabled={pressed} onChange={onChange} required autoFocus />
                <label for="floatingInput">Email address</label>
                <div ></div>
              </div>
              <div className="form-floating mb-4">
                <input type="password" className="form-control" id="floatingPassword" name="password" placeholder="Password" defaultValue={data.password} disabled={pressed} onChange={onChange} required autoFocus />
                <label for="floatingPassword">Password</label>
              </div>
              <button type="submit" className="btn btn-primary py-3 w-100 mb-4" onClick={onValidate} disabled={pressed}>Sign In</button>
              <p className="text-center mb-0">Don't have an Account? <a href="/register">Sign Up</a></p>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default Login;