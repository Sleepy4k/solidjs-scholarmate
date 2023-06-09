import * as React from "react";
import { Api, Println } from "../../utils";
import AuthLayout from "../../layouts/AuthLayout";

const Dashboard = () => {
  const [apply, setApply] = React.useState([]);
  const [applications, setApplications] = React.useState([]);

  const onLoad = () => {
    Api.get("apply")
      .then((response) => {
        const value = response.data;

        if (value.status === "success") {
          setApply(value.data);
        } else if (value.status === "error") {
          Println("Dashboard", value.message, "error");
        } else {
          Println("Dashboard", "Something went wrong!", "error");
        }
      })
      .catch((error) => {
        Println("Dashboard", error.message, "error");
      });

    Api.get("applications")
      .then((response) => {
        const value = response.data;

        if (value.status === "success") {
          setApplications(value.data);
        } else if (value.status === "error") {
          Println("Dashboard", value.message, "error");
        } else {
          Println("Dashboard", "Something went wrong!", "error");
        }
      })
      .catch((error) => {
        Println("Dashboard", error.message, "error");
      });
  };

  return (
    <AuthLayout onLoad={onLoad}>
      <>
      </>
    </AuthLayout>
  );
};

export default Dashboard;