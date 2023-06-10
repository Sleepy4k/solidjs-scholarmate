import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Loader, Navbar, Sidebar } from "../components";

const AuthLayout = ({ children, onLoad = () => {} }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login");
    } else {
      setLoading(false);
      onLoad();
    }
  }, [setLoading, navigate, onLoad]);

  if (loading) {
    return;
  }

  return (
    <div className="container-fluid position-relative d-flex p-0">
      <Loader />
      <Sidebar />
        <div className="content">
          <Navbar />
          {children}
        </div>
    </div>
  );
}

export default AuthLayout;