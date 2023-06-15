import { Api } from "../services";
import { Println } from "../utils";
import { GridData } from "../components";
import AuthLayout from "../layouts/AuthLayout";
import { Component, createSignal } from "solid-js";

const University: Component = () => {
  const field = [
    { field: "id", headerName: "ID" },
    { field: "name" },
    { field: "alias" },
    { field: "major" },
    { field: "quantity" },
    { field: "description" },
    { field: "image" },
    { field: "link" },
  ];

  const [loading, setLoading] = createSignal(true);
  const [university, setUniversity] = createSignal([]);

  const onFinish = () => {
    Api.get("university")
      .then((res) => {
        const value = res.data;
        const data = value.data

        if (value.status === "success") {
          setUniversity(data)
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
        {loading() ? null : <GridData data={university()} field={field} />}
      </div>
    </AuthLayout>
  );
};

export default University;