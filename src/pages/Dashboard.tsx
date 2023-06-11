import { Component } from "solid-js";
import AuthLayout from "../layouts/AuthLayout";

const Dashboard: Component = () => {
  return (
    <AuthLayout onFinish={() => { }}>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <h1>Dashboard</h1>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Dashboard;