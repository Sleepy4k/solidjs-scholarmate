import { Toaster } from "solid-toast";
import { useNavigate } from "@solidjs/router";
import { checkCookie, getStorage } from "../utils";
import { Loader, Navbar } from "../components";
import Sidebar from "../components/sidebar";
import { Component, createEffect, createSignal } from "solid-js";

const AuthLayout: Component<{ children: any, onFinish: () => void }> = (props: any) => {
  const navigate = useNavigate();
  const [loading, setLoading] = createSignal(true);
  const[open, setOpen] = createSignal(true)
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
        <>
          <Sidebar open={open} setOpen={setOpen} />
        <div class="container-fluid position-relative d-flex p-0">
          <div class="content">
            {props.children}
          </div>
          <Toaster />
        </div>
        </>
      )}
    </>
  )
}

export default AuthLayout;