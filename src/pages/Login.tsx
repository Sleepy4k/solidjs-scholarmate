import { Api } from "../services";
import GuestLayout from "../layouts/GuestLayout";
import { useNavigate, A } from "@solidjs/router";
import { Component, createSignal } from "solid-js";
import { Println, deleteStorage, setStorage } from "../utils";

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

    // Validasi buat Email
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

    // Validasi buat Password
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

  // submit Button
  const handleSubmit = async () => {
    Api.post("login", data())
      .then((res) => {
        const value = res.data;

        if (value.status === "success") {
          Println("Login", value.message, "success");
          handleLogin(value.data[0]);
        } else if (value.status === "failed") {
          Println("Login", value.message, "error");
        } else {
          Println("Login", "Something went wrong!", "error");
        }
      })
      .catch((err) => {
        if (err.response) {
          Println("Students", err.response.data.message, "error")
        } else {
          Println("Students", err.message, "error")
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogin = (data: any) => {
    deleteStorage("user");
    deleteStorage("student");

    setStorage("user", {
      id: data.id,
      email: data.email,
      role: data.role,
    });

    if (data.student !== null) {
      setStorage("student", {
        id: data.student.id,
        first_name: data.student.first_name,
        last_name: data.student.last_name,
        email: data.student.email,
        phone: data.student.phone,
        date_of_birth: data.student.date_of_birth,
        region: data.student.region,
        register_number: data.student.register_number,
        toefl_score: data.student.toefl_score,
        ielts_score: data.student.ielts_score,
      });
    }

    if (data.student === null && data.role === "user") {
      navigate("/student");
      return;
    }

    navigate("/");
  }

  return (
    <GuestLayout onFinish={() => {}}>
      <section class="h-screen">
        <div class="py-12 h-full">
          <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-500">
            <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                class="w-full"
                alt="Phone image"
              />
            </div>
            <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
              <h1 class="text-5xl font-bold text-blue-500 mb-5">Login</h1>
              <div class="mb-6">
                <label for="floatingEmail">Email address</label>
                <input 
                  required
                  type="email"
                  id="floatingEmail"
                  name="email"
                  placeholder="name@example.com"
                  value={data().email}
                  disabled={loading()}
                  onchange={handleChange} 
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div class="mb-6">
                <label for="floatingPassword">Password</label>
                <input 
                  required
                  type="password"
                  id="floatingPassword"
                  name="password"
                  placeholder="Password"
                  value={data().password}
                  disabled={loading()}
                  onchange={handleChange} 
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
              <button
                type="submit" onclick={handleValidation} disabled={loading()}
                class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light">
                Sign in
              </button>
              <div class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p class="text-center font-semibold mx-4 mb-0">OR</p>
              </div>
              <A
                class="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3" style="background-color: #3b5998"
                href="/register"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Sign Up
              </A>
            </div>
          </div>
        </div>
      </section>
    </GuestLayout>
  );
};

export default Login;