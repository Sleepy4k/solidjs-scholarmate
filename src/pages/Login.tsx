import GuestLayout from "../layouts/GuestLayout";
import { useNavigate, A } from "@solidjs/router";
import { Component, createSignal } from "solid-js";
import { Api, Println, setStorage } from "../utils";

const APP_NAME = import.meta.env.VITE_APP_NAME as string;

const Login: Component = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = createSignal(false);
  const [data, setData] = createSignal({
    email: "",
    password: "",
  });
  
  const handleChange = (e: any) => {
    setData({ ...data(), [e.target.name]: e.target.value });
  }

  const handleValidation = () => {
    let formIsValid = true;
    setLoading(true);

    if (!data().email) {
      formIsValid = false;
      Println("Login", "Email cannot be empty!", "error");
    } else if (typeof data().email !== "undefined") {
      let lastAtPos = data().email.lastIndexOf('@');
      let lastDotPos = data().email.lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && data().email.indexOf('@@') == -1 && lastDotPos > 2 && (data().email.length - lastDotPos) > 2)) {
        formIsValid = false;
        Println("Login", "Email is not valid!", "error");
      }
    }

    if (!data().password) {
      formIsValid = false;
      Println("Login", "Password cannot be empty!", "error");
    } else if (typeof data().password !== "undefined") {
      if (data().password.length < 6) {
        formIsValid = false;
        Println("Login", "Password must be at least 6 characters!", "error");
      }
    }

    if (formIsValid) {
      handleSubmit();
    } else {
      setLoading(false);
    }
  }

  const handleSubmit = async () => {
    Api.post("/login", data())
      .then((res) => {
        const value = res.data;

        if (value.status === "success") {
          Println("Login", value.message, "success");
          handleLogin(value.data[0]);
        } else if (value.status == "failed") {
          Println("Login", value.message, "error");
        } else {
          Println("Login", "Something went wrong!", "error");
        }
      })
      .catch((err) => {
        Println("Login", err.message, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogin = (data: any) => {
    setStorage("user", data);
    navigate("/");
  }

  return (
    <GuestLayout onFinish={() => {}}>
      <div class="container-fluid">
        <div class="row h-100 align-items-center justify-content-center min-h-screen">
          <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div class="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <A href="/">
                  <h3 class="text-primary"><i class="fa fa-user-edit me-2"></i>{APP_NAME}</h3>
                </A>
                <h3>Sign In</h3>
              </div>
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingEmail" name="email" placeholder="name@example.com" value={data().email} disabled={loading()} onchange={handleChange} required />
                <label for="floatingEmail">Email address</label>
              </div>
              <div class="form-floating mb-4">
                <input type="password" class="form-control" id="floatingPassword" name="password" placeholder="Password" value={data().password} disabled={loading()} onchange={handleChange} required />
                <label for="floatingPassword">Password</label>
              </div>
              <button type="submit" class="btn btn-primary py-3 w-100 mb-4" onclick={handleValidation} disabled={loading()}>Sign In</button>
              <p class="text-center mb-0">Don't have an Account? <A href="/register">Sign Up</A></p>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default Login;
