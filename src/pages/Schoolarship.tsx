import { Api } from "../services";
import { Println } from "../utils";
import { GridData } from "../components";
import AuthLayout from "../layouts/AuthLayout";
import { Component, createSignal } from "solid-js";

const Schoolarship: Component = () => {
  const field = [
    { field: "id", headerName: "ID" },
    { field: "name" },
    { field: "major" },
    { field: "quantity" },
    { field: "description" },
    { field: "requirement" }
  ];

  const [loading, setLoading] = createSignal(true);
  const [schoolarship, setSchoolarship] = createSignal([]);

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
      <div class="w-full">
        {loading() ? null : <GridData data={schoolarship()} field={field} />}
      </div>
    </AuthLayout>
  );
};

export default Schoolarship;