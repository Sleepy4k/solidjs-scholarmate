import { Api } from "../services";
import { Println } from "../utils";
import { GridData } from "../components";
import AuthLayout from "../layouts/AuthLayout";
import { Component, createSignal } from "solid-js";

const User: Component = () => {
  let field = []
  const [users, setUsers] = createSignal([]);
  const [loading, setLoading] = createSignal(true);

  const onFinish = async () => {
    await Api.get("user")
      .then((res) => {
        const value = res.data;
        const data = value.data

        if (value.status === "success") {
          setUsers(data)
        } else if (value.status == "failed") {
          Println("Students", value.message, "error");
        } else {
          Println("Students", "Something went wrong!", "error");
        }
      })
      .catch((err) => {
        if (err.response) {
          Println("Students", err.response.data.message, "error")
        } else {
          Println("Students", err.message, "error")
        }
      });

    field = [
      { field: "id", headerName: "ID" },
      { field: "email" },
      { field: "role" },
    ];

    setLoading(false)
  }

  return (
    <AuthLayout onFinish={onFinish}>
      <div class="w-full mt-12">
        {loading() ? null : <GridData data={users()} field={field} />}
      </div>
    </AuthLayout>
  );
};

export default User;