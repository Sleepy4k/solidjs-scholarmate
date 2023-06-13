import { Component, lazy } from 'solid-js';
import { Routes, Route } from "@solidjs/router";

// import pages
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const App: Component = () => {
  return (
    <Routes>
      <Route path="/" component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Routes>
  );
};

export default App;