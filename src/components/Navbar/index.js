import styles from './styles';
import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Api, Println, getLocalStorage, deleteLocalStorage } from "../../utils";

const Navbar = () => {
  const navigate = useNavigate();
  const user = getLocalStorage("user");

  const onLogout = async () => {
    const confirmed = window.confirm("Apakah Anda yakin ingin logout?");

    if (confirmed) {
      Api.post("auth/logout")
        .then((res) => {
          const value = res.data;

          if (value.status === "success") {
            Println("Logout", value.message, "success");
            deleteLocalStorage("user");
            navigate("/login");
          } else if (value.status === "failed") {
            Println("Logout", value.message, "error");
          } else {
            Println("Logout", "Something went wrong!", "error");
          }
        })
        .catch((err) => {
          Println("Logout", err.message, "error");
        })
    }
  }

  return (
    <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
      <Link href="#" className="sidebar-toggler flex-shrink-0">
        <i className="fa fa-bars"></i>
      </Link>
      <div className="navbar-nav align-items-center ms-auto">
        <div className="nav-item dropdown">
          <a href="/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <img className="rounded-circle me-lg-2" src="img/user.jpg" alt="" style={styles.profile}/>
            <span className="d-none d-lg-inline-flex">{user.email}</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
            <Link to="/profile" className="dropdown-item">My Profile</Link>
            <button onClick={onLogout} className="dropdown-item">Log Out</button>
          </div>
        </div>
      </div>
    </nav>
  )
};

export default Navbar;