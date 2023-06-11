import swal from 'sweetalert';
import { Component } from "solid-js";
import { useNavigate, A } from "@solidjs/router";
import { Api, Println, getStorage, deleteStorage } from "../utils";

const Navbar: Component = () => {
  const navigate = useNavigate();
  const user = getStorage("user");

  const onLogout = async () => {
    swal({
      title: "Are you sure?",
      text: "Once logged out, you will be redirected to login page!",
      icon: "warning",
      buttons: ["Cancel", "Logout"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        Api.post("/logout")
          .then((res) => {
            const value = res.data;

            if (value.status === "success") {
              Println("Logout", value.message, "success");
              deleteStorage("user");
              navigate("/login");
            } else if (value.status === "failed") {
              Println("Logout", value.message, "error");
            } else {
              Println("Logout", "Something went wrong!", "error");
            }
          })
          .catch((err) => {
            Println("Logout", err.message, "error");
          });
      }
    });
  }

  return (
    <nav class="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
      <a href="#" class="sidebar-toggler flex-shrink-0">
        <i class="fa fa-bars"></i>
      </a>
      <div class="navbar-nav align-items-center ms-auto">
        <div class="nav-item dropdown">
          <a href="/" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <img class="rounded-circle me-lg-2 w-10 h-10" src="/src/assets/img/user.jpg" alt=""/>
            <span class="d-none d-lg-inline-flex">{user.email}</span>
          </a>
          <div class="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
            <A href="/profile" class="dropdown-item">My Profile</A>
            <button onClick={onLogout} class="dropdown-item">Log Out</button>
          </div>
        </div>
      </div>
    </nav>
  )
};

export default Navbar;