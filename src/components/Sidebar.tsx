import { Component } from "solid-js";
import { useNavigate, A } from "@solidjs/router";
import { Api, deleteStorage, getStorage } from "../utils";

const APP_NAME = import.meta.env.VITE_APP_NAME as string;

const Sidebar: Component = () => {
  const user = getStorage("user");

  return (
    <div class="sidebar pe-4 pb-3">
      <nav class="navbar bg-secondary navbar-dark">
        <A href="/" class="navbar-brand mx-4 mb-3">
          <h3 class="text-primary">
            <i class="fa fa-user-edit me-2"></i>{APP_NAME}
          </h3>
        </A>
        <div class="d-flex align-items-center ms-4 mb-4">
          <div class="position-relative">
            <img class="rounded-circle w-10 h-10" src="/src/assets/img/user.jpg" alt=""/>
            <div class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
          </div>
          <div class="ms-3">
            <h6 class="mb-0">{user.email}</h6>
            <span>{user.role}</span>
          </div>
        </div>
        <div class="navbar-nav w-100">
          <A href="/" class="nav-item nav-link active">
            <i class="fa fa-tachometer-alt me-2">
            </i>Dashboard
          </A>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
