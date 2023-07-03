import { Component, lazy } from 'solid-js';
import { Routes, Route } from '@solidjs/router';

const User = lazy(() => import('./pages/User'));
const Login = lazy(() => import('./pages/Login'));
const Student = lazy(() => import('./pages/Student'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const University = lazy(() => import('./pages/University'));
const Scholarship = lazy(() => import('./pages/Scholarship'));
const UniversityEdit = lazy(() => import('./pages/UniversityEdit'));
const ScholarshipEdit = lazy(() => import('./pages/ScholarshipEdit'));

const App: Component = () => {
  return (
    <Routes>
      <Route path="/" component={Dashboard} />
      <Route path="/user" component={User} />
      <Route path="/login" component={Login} />
      <Route path="/student" component={Student} />
      <Route path="/register" component={Register} />
      <Route path="/student/add" component={Student} />
      <Route path="/university" component={University} />
      <Route path="/scholarship" component={Scholarship} />
      <Route path="/student/:id/edit" component={Student} />
      <Route path="/university/:id/edit" component={UniversityEdit} />
      <Route path="/scholarship/:id/edit" component={ScholarshipEdit} />
    </Routes>
  );
};

export default App;
