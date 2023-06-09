import * as React from "react";
import { Loader } from "../components";
import { useNavigate } from "react-router-dom";

const GuestLayout = ({ children, onLoad = () => {} }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      navigate("/");
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
      {children}
    </div>
  );
}

export default GuestLayout;