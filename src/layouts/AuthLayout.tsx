import { Toaster } from "solid-toast";
import { useNavigate } from "@solidjs/router";
import { checkCookie, getStorage } from "../utils";
import { Loader, Navbar, Sidebar } from "../components";
import { Component, createEffect, createSignal } from "solid-js";

const AuthLayout: Component<{ children: any, onFinish: () => void }> = (props: any) => {
  const navigate = useNavigate();
  const [loading, setLoading] = createSignal(true);

  createEffect(async () => {
    const user = getStorage("user");
    const isUserLoggedIn = checkCookie("schoolarship_auth_token");

    if (!isUserLoggedIn || !user) {
      navigate("/login");
    } else {
      setLoading(false);
      await props.onFinish()
    }
  });

  return (
    <>
      {loading() ? <Loader title={"Loading ..."} /> : (
        <div class="container-fluid position-relative d-flex p-0">
          <Sidebar />
          <div class="content">
            <Navbar />
            {props.children}
          </div>
          <Toaster />
        </div>
      )}
    </>
  )
}

export default AuthLayout;