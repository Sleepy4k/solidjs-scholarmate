import { Component, createSignal, lazy } from 'solid-js';

import { Router, Routes, Route } from "@solidjs/router";


const Login = lazy(() => import("./pages/auth/login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Dashboard = lazy(() => import("./pages/dash/dashboard"));

const App: Component = () => {
  return (
  <Router>
      <Routes>
        <Route path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Routes>
  </Router>
    
  );
};

export default App;