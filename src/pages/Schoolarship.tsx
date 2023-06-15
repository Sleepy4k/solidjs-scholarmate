import { Api } from "../services";
import { GridData } from "../components";
import AuthLayout from "../layouts/AuthLayout";
import { Println, getStorage } from "../utils";
import { Component, createSignal } from "solid-js";
import { Button } from "@suid/material";

const Schoolarship: Component = () => {
  const user = getStorage("user")
  const [loading, setLoading] = createSignal(true);
  const [schoolarship, setSchoolarship] = createSignal([]);

  let field = [
    { field: "id", headerName: "ID" },
    { field: "name" },
    { field: "major" },
    { field: "quantity" },
    { field: "description" },
    { field: "requirement" },
    { field: "action", cellRenderer: (params) => (
      <div class = "space-x-3">
        <Button  variant="contained" color="success">
             Edit 
          </Button>
        <Button  variant="contained" color="error">
             Delete 
        </Button>
      </ div>
    )}
  ];

  if (user.role != "admin") {
    field = [
      { field: "id", headerName: "ID" },
      { field: "name" },
      { field: "major" },
      { field: "quantity" },
      { field: "description" },
      { field: "requirement" },
      { field: "action", cellRenderer: (params) => (
        <>
          <Button variant="contained" color="success">
             Apply
          </Button>
        </>
      )}
    ];
  }

  const onFinish = () => {
    Api.get("schoolarship")
      .then((res) => {
        const value = res.data;
        const data = value.data

        if (value.status === "success") {
          setSchoolarship(data)
          setLoading(false)
        } else if (value.status == "failed") {
          Println("Students", value.message, "error");
        } else {
          Println("Students", "Something went wrong!", "error");
        }
      })
      .catch((err) => {
        Println("Students", err.message, "error")
      })
      .finally(() => {
        setLoading(false)
      });
  }

  return (
    <AuthLayout onFinish={onFinish}>
      <div class="w-full mt-12">
        {loading() ? null : <GridData data={schoolarship()} field={field} />}
      </div>
    </AuthLayout>
  );
};

export default Schoolarship;