import styles from './styles';
import * as React from 'react';
import env from 'react-dotenv';
import { Link } from "react-router-dom";
import { getLocalStorage } from "../../utils";

const Sidebar = () => {
  const user = getLocalStorage("user");

  return (
    <div className="sidebar pe-4 pb-3">
      <nav className="navbar bg-secondary navbar-dark">
        <Link to="/" className="navbar-brand mx-4 mb-3">
          <h3 className="text-primary">
            <i className="fa fa-user-edit me-2"></i>{env.APP_NAME}
          </h3>
        </Link>
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <img className="rounded-circle" src="img/user.jpg" alt="" style={styles.profile}/>
            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
          </div>
          <div className="ms-3">
            <h6 className="mb-0">{user.email}</h6>
            <span>{user.role}</span>
          </div>
        </div>
        <div className="navbar-nav w-100">
          <Link to="/" className="nav-item nav-link active">
            <i className="fa fa-tachometer-alt me-2">
            </i>Dashboard
          </Link>
        </div>
      </nav>
    </div>
  )
};

export default Sidebar;